/**
 * Learning Roadmap data for various technology tracks.
 * Each roadmap contains stages with topics organized by difficulty.
 */
export const roadmaps = [
  {
    id: 'java-fullstack',
    title: 'Java Full Stack',
    icon: '☕',
    color: '#E76F00',
    description: 'Master Java backend with Spring Boot and modern frontend technologies.',
    duration: '6-8 months',
    stages: [
      {
        level: 'Beginner',
        color: '#10B981',
        topics: [
          { name: 'Java Basics', description: 'Variables, data types, operators, control flow', duration: '2 weeks' },
          { name: 'OOP Concepts', description: 'Classes, objects, inheritance, polymorphism, abstraction', duration: '2 weeks' },
          { name: 'Collections Framework', description: 'List, Set, Map, Queue, Iterator pattern', duration: '1 week' },
          { name: 'Exception Handling', description: 'Try-catch, custom exceptions, best practices', duration: '1 week' },
        ],
      },
      {
        level: 'Intermediate',
        color: '#F59E0B',
        topics: [
          { name: 'JDBC', description: 'Database connectivity, CRUD operations, connection pooling', duration: '1 week' },
          { name: 'Servlets', description: 'HTTP lifecycle, request/response, session management', duration: '1 week' },
          { name: 'JSP', description: 'Server-side rendering, JSTL, EL expressions', duration: '1 week' },
          { name: 'Maven/Gradle', description: 'Build tools, dependency management, project structure', duration: '3 days' },
        ],
      },
      {
        level: 'Advanced',
        color: '#EF4444',
        topics: [
          { name: 'Spring Framework', description: 'IoC, DI, AOP, Spring MVC', duration: '2 weeks' },
          { name: 'Spring Boot', description: 'Auto-configuration, starters, actuator, profiles', duration: '2 weeks' },
          { name: 'REST APIs', description: 'RESTful design, request mapping, validation, error handling', duration: '1 week' },
          { name: 'Microservices', description: 'Service discovery, API gateway, circuit breaker', duration: '2 weeks' },
          { name: 'Spring Security & JWT', description: 'Authentication, authorization, token-based security', duration: '1 week' },
        ],
      },
      {
        level: 'Frontend',
        color: '#2563EB',
        topics: [
          { name: 'HTML & CSS', description: 'Semantic HTML, Flexbox, Grid, responsive design', duration: '1 week' },
          { name: 'JavaScript ES6+', description: 'Modern JS features, async/await, modules', duration: '2 weeks' },
          { name: 'React', description: 'Components, hooks, state management, routing', duration: '3 weeks' },
        ],
      },
      {
        level: 'Projects',
        color: '#8B5CF6',
        topics: [
          { name: 'Todo Application', description: 'Full CRUD with Spring Boot + React', duration: '1 week' },
          { name: 'Hospital Management System', description: 'Patient, doctor, appointment management', duration: '2 weeks' },
          { name: 'E-Commerce Application', description: 'Product catalog, cart, orders, payments', duration: '3 weeks' },
        ],
      },
    ],
  },
  {
    id: 'python-fullstack',
    title: 'Python Full Stack',
    icon: '🐍',
    color: '#3776AB',
    description: 'Build web applications with Python, Django/Flask, and modern frontend.',
    duration: '5-7 months',
    stages: [
      {
        level: 'Beginner',
        color: '#10B981',
        topics: [
          { name: 'Python Fundamentals', description: 'Syntax, data types, functions, modules', duration: '2 weeks' },
          { name: 'OOP in Python', description: 'Classes, inheritance, decorators, magic methods', duration: '1 week' },
          { name: 'Data Structures', description: 'Lists, dictionaries, sets, tuples, comprehensions', duration: '1 week' },
          { name: 'File I/O & Modules', description: 'File handling, standard library, pip packages', duration: '1 week' },
        ],
      },
      {
        level: 'Intermediate',
        color: '#F59E0B',
        topics: [
          { name: 'Flask', description: 'Routing, templates, forms, extensions', duration: '2 weeks' },
          { name: 'Django', description: 'MVT pattern, ORM, admin, forms, middleware', duration: '3 weeks' },
          { name: 'Database & ORM', description: 'SQLAlchemy, Django ORM, PostgreSQL', duration: '1 week' },
          { name: 'REST APIs', description: 'Django REST Framework, serializers, viewsets', duration: '1 week' },
        ],
      },
      {
        level: 'Advanced',
        color: '#EF4444',
        topics: [
          { name: 'Authentication & Security', description: 'JWT, OAuth, CORS, CSRF protection', duration: '1 week' },
          { name: 'Celery & Redis', description: 'Task queues, background jobs, caching', duration: '1 week' },
          { name: 'Docker & Deployment', description: 'Containerization, CI/CD, cloud deployment', duration: '1 week' },
        ],
      },
      {
        level: 'Frontend',
        color: '#2563EB',
        topics: [
          { name: 'HTML, CSS, JavaScript', description: 'Web fundamentals and responsive design', duration: '2 weeks' },
          { name: 'React or Vue.js', description: 'SPA development with modern frameworks', duration: '3 weeks' },
        ],
      },
      {
        level: 'Projects',
        color: '#8B5CF6',
        topics: [
          { name: 'Blog Platform', description: 'Full-featured blog with user auth', duration: '1 week' },
          { name: 'Social Media App', description: 'Posts, comments, likes, follow system', duration: '2 weeks' },
          { name: 'Job Portal', description: 'Job listings, applications, employer dashboard', duration: '3 weeks' },
        ],
      },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    icon: '📊',
    color: '#FF6384',
    description: 'Learn data analysis, visualization, and machine learning techniques.',
    duration: '6-9 months',
    stages: [
      {
        level: 'Beginner',
        color: '#10B981',
        topics: [
          { name: 'Python for Data Science', description: 'NumPy, Pandas, data manipulation', duration: '2 weeks' },
          { name: 'Statistics & Probability', description: 'Descriptive stats, distributions, hypothesis testing', duration: '2 weeks' },
          { name: 'Data Visualization', description: 'Matplotlib, Seaborn, Plotly', duration: '1 week' },
          { name: 'SQL for Analytics', description: 'Queries, aggregations, window functions', duration: '1 week' },
        ],
      },
      {
        level: 'Intermediate',
        color: '#F59E0B',
        topics: [
          { name: 'Machine Learning Basics', description: 'Supervised & unsupervised learning, scikit-learn', duration: '3 weeks' },
          { name: 'Feature Engineering', description: 'Data cleaning, transformation, selection', duration: '1 week' },
          { name: 'Model Evaluation', description: 'Cross-validation, metrics, hyperparameter tuning', duration: '1 week' },
        ],
      },
      {
        level: 'Advanced',
        color: '#EF4444',
        topics: [
          { name: 'Deep Learning', description: 'Neural networks, TensorFlow, Keras', duration: '3 weeks' },
          { name: 'NLP', description: 'Text processing, sentiment analysis, transformers', duration: '2 weeks' },
          { name: 'Time Series Analysis', description: 'ARIMA, LSTM, forecasting', duration: '1 week' },
        ],
      },
      {
        level: 'Projects',
        color: '#8B5CF6',
        topics: [
          { name: 'EDA Dashboard', description: 'Interactive data exploration with Streamlit', duration: '1 week' },
          { name: 'Prediction Model', description: 'House price / stock prediction', duration: '2 weeks' },
          { name: 'Recommendation System', description: 'Collaborative filtering, content-based', duration: '2 weeks' },
        ],
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / ML',
    icon: '🤖',
    color: '#9333EA',
    description: 'Deep dive into artificial intelligence and machine learning engineering.',
    duration: '8-12 months',
    stages: [
      {
        level: 'Beginner',
        color: '#10B981',
        topics: [
          { name: 'Mathematics for ML', description: 'Linear algebra, calculus, probability', duration: '3 weeks' },
          { name: 'Python & Libraries', description: 'NumPy, Pandas, Matplotlib', duration: '2 weeks' },
          { name: 'Intro to ML', description: 'Types of learning, bias-variance, overfitting', duration: '2 weeks' },
        ],
      },
      {
        level: 'Intermediate',
        color: '#F59E0B',
        topics: [
          { name: 'Classical ML Algorithms', description: 'Regression, trees, SVM, ensemble methods', duration: '3 weeks' },
          { name: 'Neural Networks', description: 'Perceptrons, backpropagation, activation functions', duration: '2 weeks' },
          { name: 'Computer Vision', description: 'CNNs, image classification, object detection', duration: '3 weeks' },
        ],
      },
      {
        level: 'Advanced',
        color: '#EF4444',
        topics: [
          { name: 'NLP & Transformers', description: 'Attention mechanism, BERT, GPT', duration: '3 weeks' },
          { name: 'Generative AI', description: 'GANs, VAEs, diffusion models', duration: '2 weeks' },
          { name: 'MLOps', description: 'Model deployment, monitoring, CI/CD for ML', duration: '2 weeks' },
          { name: 'Reinforcement Learning', description: 'Q-learning, policy gradients, environments', duration: '2 weeks' },
        ],
      },
      {
        level: 'Projects',
        color: '#8B5CF6',
        topics: [
          { name: 'Image Classifier', description: 'CNN-based classification with TensorFlow', duration: '1 week' },
          { name: 'Chatbot', description: 'NLP-based conversational AI', duration: '2 weeks' },
          { name: 'End-to-End ML Pipeline', description: 'Data → Training → Deployment → Monitoring', duration: '3 weeks' },
        ],
      },
    ],
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    icon: '☁️',
    color: '#0EA5E9',
    description: 'Master cloud platforms and services for scalable applications.',
    duration: '4-6 months',
    stages: [
      {
        level: 'Beginner',
        color: '#10B981',
        topics: [
          { name: 'Cloud Fundamentals', description: 'IaaS, PaaS, SaaS, cloud models', duration: '1 week' },
          { name: 'Linux Essentials', description: 'CLI, file system, permissions, shell scripting', duration: '2 weeks' },
          { name: 'Networking Basics', description: 'TCP/IP, DNS, VPC, subnets, load balancing', duration: '1 week' },
        ],
      },
      {
        level: 'Intermediate',
        color: '#F59E0B',
        topics: [
          { name: 'AWS Core Services', description: 'EC2, S3, RDS, Lambda, IAM', duration: '3 weeks' },
          { name: 'Azure / GCP', description: 'Alternative cloud platforms overview', duration: '2 weeks' },
          { name: 'Serverless Architecture', description: 'Functions, API Gateway, event-driven', duration: '1 week' },
        ],
      },
      {
        level: 'Advanced',
        color: '#EF4444',
        topics: [
          { name: 'Infrastructure as Code', description: 'Terraform, CloudFormation, Pulumi', duration: '2 weeks' },
          { name: 'Cloud Security', description: 'IAM policies, encryption, compliance', duration: '1 week' },
          { name: 'Cost Optimization', description: 'Reserved instances, spot, right-sizing', duration: '1 week' },
        ],
      },
      {
        level: 'Projects',
        color: '#8B5CF6',
        topics: [
          { name: 'Deploy Web App on AWS', description: 'EC2 + RDS + S3 + CloudFront', duration: '1 week' },
          { name: 'Serverless API', description: 'Lambda + API Gateway + DynamoDB', duration: '1 week' },
          { name: 'Multi-Tier Architecture', description: 'VPC, auto-scaling, monitoring', duration: '2 weeks' },
        ],
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: '⚙️',
    color: '#F97316',
    description: 'Learn CI/CD, containerization, and infrastructure automation.',
    duration: '5-7 months',
    stages: [
      {
        level: 'Beginner',
        color: '#10B981',
        topics: [
          { name: 'Linux Administration', description: 'System administration, services, cron, logs', duration: '2 weeks' },
          { name: 'Version Control (Git)', description: 'Branching, merging, Git workflows', duration: '1 week' },
          { name: 'Networking & Security', description: 'Firewalls, SSH, SSL/TLS, ports', duration: '1 week' },
          { name: 'Scripting', description: 'Bash, Python for automation', duration: '1 week' },
        ],
      },
      {
        level: 'Intermediate',
        color: '#F59E0B',
        topics: [
          { name: 'Docker', description: 'Images, containers, Dockerfile, Docker Compose', duration: '2 weeks' },
          { name: 'CI/CD Pipelines', description: 'Jenkins, GitHub Actions, GitLab CI', duration: '2 weeks' },
          { name: 'Configuration Management', description: 'Ansible, Chef, Puppet', duration: '1 week' },
        ],
      },
      {
        level: 'Advanced',
        color: '#EF4444',
        topics: [
          { name: 'Kubernetes', description: 'Pods, services, deployments, Helm charts', duration: '3 weeks' },
          { name: 'Terraform', description: 'Infrastructure as Code, modules, state management', duration: '2 weeks' },
          { name: 'Monitoring & Logging', description: 'Prometheus, Grafana, ELK Stack', duration: '1 week' },
          { name: 'Service Mesh', description: 'Istio, Envoy, traffic management', duration: '1 week' },
        ],
      },
      {
        level: 'Projects',
        color: '#8B5CF6',
        topics: [
          { name: 'CI/CD Pipeline', description: 'Automated build, test, deploy pipeline', duration: '1 week' },
          { name: 'Kubernetes Cluster', description: 'Multi-service app on K8s with Helm', duration: '2 weeks' },
          { name: 'Infrastructure Automation', description: 'Terraform + Ansible end-to-end', duration: '2 weeks' },
        ],
      },
    ],
  },
];
