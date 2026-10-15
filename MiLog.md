# Log 

this is a log / note for myself to read, documentation u may call it. But i prefer to call it log

## 13 October 2026, 22:22
First log created, a bit late yes i know but i created this micro-app to learn the basics of devops. For the tech that i used is python with flask for API then redis for keeping 1 counter variable. I know its not a database but i js want to know how things work. 
Then i use Docker to containarize and run it, so it wont intervene with my laptops other project library. Tbh i used AI for Dockerfile and compose.yaml since im new at Docker, I'm new at this so im not used to writing Dockerfile or compose.yaml (need to look more deeper to that in order to learn DevOps). 
I also used K6 to learn testing aswell, as far as i know from youtube there's 4 kinf of test; Stress test, Load test, Spike test, Soak test.
Also i just know that gunicorn is used to run python api server :o i think its like apache or sum sort(?). idk might need to look into that aswell since im using python. I do want to use go, but i havent write a single line of Go (API) in my life. I do already have my old laravel / springboot ssms api. But i think its kinda too big / complex for a beginner project. 
Yea for now im js gonna stick to this micro-app, im not a fan og Python but hey im still in a learning phase so why not try to know it a bit haha. Anyway thats all i think (?) yea thats it i think 
End of log.

## 14 October 2026 10:46 
Hmm tbh i dont know what i was gonna learn for devops today but i got tired of committee meetings lately so imma pass

## 15 October 2026 23:10
So ive decided to take a closer look to Dockerfile. I'll take a closer look to it then. So i added a couple lines in Dockerfile its me trying to explain and reason on why do i write Dockerfile that way. Cuz the why is more important than what. So i try my best explaining what each step does and why it does that instead of this. I js found that run and cmd both run command but "run" is a command you ran when you're first creating the container, whilst cmd is a command u ran each time u start a container. Then COPY syntax works like this COPY <file name> <destination> (basically works like the cp command :o). Also i js knew that the EXPOSE syntax doesnt meant u assign a port to that container but its to only to act as Documentation. . . Shocking right ? ik. So in short its only purpose js to say that ts container expects a traffic at port 5050. . . Well it can be read by Docker if i ran the Dockerfile with docker run -P. But in my case i use compose to manage my redis database so it statys in one whole package.
