# React 18+: Automatic Batching

## Introduction

Automatic Batching is a significant performance enhancement introduced in React 18. It ensures that multiple state updates triggered from various sources within a single event tick are grouped (batched) into a single re-render cycle.

## Key Improvement

- **Before React 18:** Batching primarily occurred only within React event handlers (like `onClick`). Updates inside Promises, `setTimeout`, native event handlers, etc., would each trigger separate re-renders.
- **With React 18:** Batching is now automatic for updates inside **any** context (Promises, `setTimeout`, native event handlers, etc.) by default when using `createRoot`. This leads to fewer re-renders and better performance out-of-the-box.

## Further Details

For a more detailed explanation, diagrams, code examples comparing pre-React 18 and React 18 behavior, and information on opting out with `flushSync`, please refer to the **[Batched Updates](./../../optimization-strategies/batched-updates/README.md)** topic in the Optimization Strategies section.

## Conclusion

Automatic Batching simplifies development and improves performance by default in React 18+, reducing the number of unnecessary re-renders caused by multiple state updates. 