const Employee = require("../lib/Employee");

test("The 'name' works", () => {
  const name = "Alice";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test("The 'id' works", () => {
  const testValue = "Hello";
  const e = new Employee("Foo", testValue);
  expect(e.id).toBe(testValue);
});

test("The email works", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);
  expect(e.email).toBe(testValue);
});

test("getRole() returns \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Alice", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});
