export const interviewQuestions = {
  java: [
    {
      id: 'j1',
      question: 'What is the difference between JVM, JRE, and JDK?',
      type: 'Technical',
      difficulty: 'Beginner',
      keywords: ['virtual machine', 'runtime environment', 'development kit', 'compiler', 'bytecode'],
      modelAnswer: 'JVM (Java Virtual Machine) is the engine that drives the Java code by converting bytecode into machine language. JRE (Java Runtime Environment) contains the JVM along with libraries and other files that JVM uses at runtime. JDK (Java Development Kit) is a full-featured software development kit for Java, containing the JRE, compiler (javac), debugger, and other development tools.'
    },
    {
      id: 'j2',
      question: 'Explain the concept of OOP principles in Java and how they are implemented.',
      type: 'Technical',
      difficulty: 'Intermediate',
      keywords: ['inheritance', 'polymorphism', 'encapsulation', 'abstraction', 'extends', 'implements', 'interface', 'class'],
      modelAnswer: 'Object-Oriented Programming (OOP) in Java relies on four core principles: Encapsulation (hiding data using private variables and accessors), Inheritance (reusing code using the "extends" keyword), Polymorphism (method overloading and overriding to change behavior at runtime/compile-time), and Abstraction (using abstract classes and interfaces to hide implementation details and show only functionality).'
    },
    {
      id: 'j3',
      question: 'How does Garbage Collection work in Java? Describe the generational hypothesis.',
      type: 'Technical',
      difficulty: 'Advanced',
      keywords: ['garbage collection', 'memory management', 'heap', 'young generation', 'old generation', 'metaspace', 'minor gc', 'major gc', 'stop the world'],
      modelAnswer: 'Garbage Collection (GC) in Java manages heap memory by automatically identifying and deleting unused objects. It is based on the Generational Hypothesis (most objects die young). Heap is split into Young Generation (Eden space, Survivor spaces S0/S1) and Old/Tenured Generation. New objects go to Eden. Minor GC cleans Young Gen and promotes survivors. Major GC/Full GC cleans Old Gen. GC algorithms like G1, ZGC, or CMS optimize the pause times ("stop the world" events).'
    }
  ],
  springboot: [
    {
      id: 'sb1',
      question: 'What is Dependency Injection (DI) and how is it achieved in Spring Boot?',
      type: 'Technical',
      difficulty: 'Beginner',
      keywords: ['dependency injection', 'inversion of control', 'ioc', '@autowired', 'constructor', 'setter', 'bean'],
      modelAnswer: 'Dependency Injection (DI) is a design pattern that implements Inversion of Control (IoC) to remove hard-coded dependencies. Spring Boot automatically manages and instantiates classes (Beans) in its application context. You can achieve DI using Constructor Injection (recommended), Setter Injection, or Field Injection using the @Autowired annotation.'
    },
    {
      id: 'sb2',
      question: 'What is the purpose of @SpringBootApplication and what annotations does it include?',
      type: 'Technical',
      difficulty: 'Intermediate',
      keywords: ['@springbootconfiguration', '@enableautoconfiguration', '@componentscan', 'bootstrap', 'auto-configuration'],
      modelAnswer: '@SpringBootApplication is a convenience annotation that bootstraps a Spring Boot application. It combines three key annotations: @SpringBootConfiguration (indicates this is a configuration class), @EnableAutoConfiguration (tells Spring to automatically configure beans based on classpath dependencies), and @ComponentScan (tells Spring to scan the current package and subpackages for components/beans).'
    }
  ],
  react: [
    {
      id: 'r1',
      question: 'What is the Virtual DOM and how does React use it to optimize rendering?',
      type: 'Technical',
      difficulty: 'Beginner',
      keywords: ['virtual dom', 'diffing', 'reconciliation', 're-render', 'performance', 'real dom'],
      modelAnswer: 'The Virtual DOM is a lightweight, in-memory representation of the real DOM. When state changes, React creates a new virtual DOM tree, compares it with the previous one (a process called "diffing"), and calculates the minimum changes needed. It then applies only those updates to the real DOM (called "reconciliation"), which is much faster than re-rendering the entire page.'
    },
    {
      id: 'r2',
      question: 'Explain the difference between useEffect cleanup function, empty dependency array, and state dependencies.',
      type: 'Technical',
      difficulty: 'Intermediate',
      keywords: ['dependency array', 'cleanup', 'unmount', 'effect', 'stale closures', 'lifecycle'],
      modelAnswer: 'In useEffect, the dependency array controls when the effect runs: an empty array `[]` runs once after the initial render (like componentDidMount); a dependency array with variables `[stateVar]` runs whenever those variables change; omitting the array runs on every render. The cleanup function returned by the effect runs before the effect runs again and when the component unmounts, preventing memory leaks (e.g., clearing intervals, unsubscribing from sockets).'
    },
    {
      id: 'r3',
      question: 'How do you optimize React application performance? Mention code splitting and memoization.',
      type: 'Technical',
      difficulty: 'Advanced',
      keywords: ['usememo', 'usecallback', 'react.memo', 'code splitting', 'lazy loading', 'suspense', 're-renders'],
      modelAnswer: 'React apps can be optimized through several methods: 1) Memoization using `React.memo` (to prevent unnecessary child re-renders), `useMemo` (to cache expensive computations), and `useCallback` (to cache function references). 2) Code Splitting using `React.lazy` and `Suspense` to load bundles only when needed. 3) Keeping state local to prevent global re-renders. 4) Using key prop correctly in lists to help reconciliation.'
    }
  ],
  python: [
    {
      id: 'p1',
      question: 'What are list comprehensions and how do they differ from normal loops?',
      type: 'Technical',
      difficulty: 'Beginner',
      keywords: ['list comprehension', 'syntax', 'readable', 'expression', 'iterable'],
      modelAnswer: 'List comprehensions provide a concise way to create lists in Python. Instead of using a multi-line `for` loop with `.append()`, you write the expression in a single line inside square brackets, e.g., `[x**2 for x in range(10)]`. They are generally faster and more readable, though complex comprehensions should be avoided for code clarity.'
    },
    {
      id: 'p2',
      question: 'Explain the difference between deep copy and shallow copy in Python.',
      type: 'Technical',
      difficulty: 'Intermediate',
      keywords: ['copy module', 'shallow copy', 'deep copy', 'reference', 'nested objects', 'id'],
      modelAnswer: 'A shallow copy constructs a new compound object and inserts references to the original nested objects. Modifying a nested list in a shallow copy will affect the original object. A deep copy constructs a new compound object and recursively inserts copies of the nested objects found in the original. Changes to a deep copy never affect the original object.'
    }
  ],
  sql: [
    {
      id: 's1',
      question: 'What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN?',
      type: 'Technical',
      difficulty: 'Beginner',
      keywords: ['inner join', 'left join', 'right join', 'matching rows', 'null values', 'tables'],
      modelAnswer: 'INNER JOIN returns rows when there is a match in both tables. LEFT JOIN returns all rows from the left table, and the matched rows from the right table; if no match, it returns NULL for right table columns. RIGHT JOIN returns all rows from the right table, and the matched rows from the left table; if no match, it returns NULL for left table columns.'
    },
    {
      id: 's2',
      question: 'What are indexes in SQL? How do they improve performance, and what are their drawbacks?',
      type: 'Technical',
      difficulty: 'Intermediate',
      keywords: ['index', 'search speed', 'b-tree', 'insert', 'update', 'performance', 'storage', 'overhead'],
      modelAnswer: 'An index is a database structure (often a B-Tree) that speeds up data retrieval operations on a table at the cost of additional write overhead and storage space. While it makes `SELECT` and `WHERE` queries much faster, it slows down `INSERT`, `UPDATE`, and `DELETE` operations because the index must also be updated every time the table data changes.'
    }
  ],
  behavioral: [
    {
      id: 'b1',
      question: 'Describe a situation where you had a conflict with a team member. How did you resolve it?',
      type: 'Behavioral',
      difficulty: 'Intermediate',
      keywords: ['conflict', 'communication', 'listening', 'compromise', 'collaboration', 'resolution'],
      modelAnswer: 'Use the STAR method (Situation, Task, Action, Result). State the professional disagreement (e.g., project architecture choice), describe your task, explain how you set up a private call, listened actively to their point of view, discussed pros/cons objectively, and reached a compromise (e.g., hybrid approach) that delivered the project on time with high quality.'
    },
    {
      id: 'b2',
      question: 'Tell me about a time you failed. What did you learn from the experience?',
      type: 'Behavioral',
      difficulty: 'Intermediate',
      keywords: ['failure', 'learning', 'responsibility', 'growth', 'feedback', 'retrospective'],
      modelAnswer: 'Describe a realistic failure (e.g., missing a bug in release or underestimating a task timeframe). Own the mistake immediately instead of blaming others. Explain the immediate action you took to mitigate the failure (e.g., working extra to patch the bug, communicating transparently), and detail the long-term learning or process improvements you implemented to prevent it from happening again.'
    }
  ],
  system_design: [
    {
      id: 'sd1',
      question: 'How would you design a scalable URL shortening service like Bitly?',
      type: 'Technical',
      difficulty: 'Advanced',
      keywords: ['hashing', 'base62', 'database replication', 'caching', 'redis', 'load balancer', 'unique id'],
      modelAnswer: 'To design Bitly: 1) Calculate read/write ratios (highly read-heavy). 2) Use Base62 encoding on an auto-incremented ID or MD5 hash truncated to 7 characters. 3) API endpoints: POST /v1/shorten and GET /{shortUrl}. 4) Database: NoSQL (e.g., Cassandra) or SQL with indexing. 5) Scale using Redis cache for popular URLs (80/20 rule), Load Balancers (NGINX), database replication, and horizontal scaling of application servers.'
    }
  ]
};

export const techStackOptions = [
  { id: 'java', label: 'Java' },
  { id: 'springboot', label: 'Spring Boot' },
  { id: 'react', label: 'React' },
  { id: 'python', label: 'Python' },
  { id: 'sql', label: 'SQL' },
  { id: 'system_design', label: 'System Design' },
  { id: 'behavioral', label: 'Behavioral / HR' }
];
