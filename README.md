# Node.js TypeScript Backend

In this project I am trying to implement some basics of DDD, GRASP and SOLID.

It uses `tsyringe` as a DI library and `fastify` as a HTTP framework.

The application is structured in layers, each serving a specific purpose. Each layer interacts with other layers through explicitly defined contracts or interfaces. This allows for changing the implementation of one layer without impacting the rest of the application.

It provides flexibility and the ability to easily substitute components or modify the way they interact. For example, it is possible to replace a database without altering the application logic, as long as the data access layer interface remains unchanged.

This enables developer to make changes to the application with reduced side effects, simplifying testing and code maintenance.
