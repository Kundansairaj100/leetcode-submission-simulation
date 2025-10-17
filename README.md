# Leetcode Submissions Simulation

 ## Context
 - Everyday, millions of users across the globe use leetcode for practicing DSA.
 - for a curious Software Developer questions might come like:
 - How does leetcode these submissions efficiently ? 
 - Does a single server handles all the processing ? 
 - let's see how it's handled!
 - This is not a complete but partial implementation of how leetcode may handle submissions.

## Technology Involved

### Microservice Architecture
 1. Currently major web applications use the distributed servers architecture also famously called as Micro-service Architecture. 
 2. These servers are majorly utilized to: 
		
		. Reduce the load of primary servers
		. Handle users based on geographic distribution 
		. Break down services to different servers to increase availability

### Asynchronous Communications 
 - In asynchronous communications, The sender dosen't expect a immediate response from the other participants. 
 - Allowing Non-blocking communications, and enhances user experience by allowing them to perform other activities instead of waiting. 

### Queues & Pub-Subs
- Queues and pubsubs enable better handling of distributed and async communications across multiple servers. 
- Redis is an open-source app, which enables features like: Database, caching and message brooking in memory(RAM).


Any major web-app these days utlizes these technologies to enhance metrics like: Availability and Scalability. 

## Project Architecture

<img width="1338" height="698" alt="image" src="https://github.com/user-attachments/assets/b321b3ef-42fe-4a78-bf9c-71fc4cf58c33" />


 - **Primary Backend:** Handles the requests sent from the user and pushes it into the redis queue (Lpush).
 - **Worker:** Handles the processing of the code by picking up available tasks in the queue and returns the result by publishing it to the primary backends*.

- This architecture of **Primary backend - Worker**  reduces the load massively because processing of code can be quite intensive and that to handling processing from multiple users can be computationally & time wise very expensive. 
- This also increases availability, because if the primary backend was handling all the processing and it goes down then the entire application goes down as well.

 - **Note:** Here generally pub-sub architecture is used to hanlde submission distribution & response management between the primary backends and the worker servers. 
