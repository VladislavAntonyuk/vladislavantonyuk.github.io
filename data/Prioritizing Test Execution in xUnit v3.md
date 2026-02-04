> Today marks 3 years since russia's full-scale war against Ukraine. Thank you to our heroes who courageously and selflessly defend our land and our partners who stand steadfastly with us. Your strength, resilience, and support bring us closer to victory. Together we will win! 🇺🇦💙💛

In automated testing, test prioritization helps control the execution order of tests, ensuring that critical tests run first. Unlike some testing frameworks that provide built-in priority attributes, xUnit does not natively support test prioritization. However, we can achieve this by leveraging test collections, ordering features, and custom attributes.

The recommended way to control test execution order in xUnit is by implementing `ITestCaseOrderer` and `ITestCollectionOrderer`. This allows you to define a custom ordering logic for your test methods.

## Step 1: Create a Custom Test Attribute
```csharp
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
public class TestPriorityAttribute(int priority) : Attribute
{
    public int Priority { get; private set; } = priority;
}
```

## Step 2: Create a Custom Test Orderer
```csharp
public class PriorityOrderer : ITestCaseOrderer
{
    public IReadOnlyCollection<TTestCase> OrderTestCases<TTestCase>(IReadOnlyCollection<TTestCase> testCases)
        where TTestCase : ITestCase
    {
        var sortedMethods = new SortedDictionary<int, List<TTestCase>>();
        foreach (var testCase in testCases)
        {
            var priority = ((testCase.TestMethod as XunitTestMethod)?.Method
                .GetCustomAttributes(typeof(TestPriorityAttribute))
                .FirstOrDefault() as TestPriorityAttribute)?.Priority ?? 0;

            GetOrCreate(sortedMethods, Convert.ToInt32(priority)).Add(testCase);
        }

        return sortedMethods.Keys
            .SelectMany(priority => sortedMethods[priority].OrderBy(testCase => testCase.TestMethod?.MethodName))
            .ToList();
    }

    private static TValue GetOrCreate<TKey, TValue>(
        IDictionary<TKey, TValue> dictionary, TKey key)
        where TValue : new()
    {
        if (dictionary.TryGetValue(key, out var value))
        {
            return value;
        }

        dictionary[key] = new TValue();
        return dictionary[key];
    }
}
```

## Step 3: Apply the Orderer in Your Test Class
```csharp
[TestCaseOrderer(typeof(PriorityOrderer))]
public class OrderedTests
{
    [Fact]
    [TestPriority(2)]
    public void TestB()
    {
        // Test logic
    }

    [Fact]
    [TestPriority(1)]
    public void TestA()
    {
        // Test logic
    }
}
```

# Conclusion

Ideally, the order in which unit tests run should not matter, and it is best practice to avoid ordering unit tests. Regardless, there may be a need to do so.