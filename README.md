## Övningsuppgifter vecka 35

### 1. Instuderingsfrågor

##### 1. Hur kan följande Dockerfile kunna förbättras?

```dockerfile
FROM node
WORKDIR /app
COPY . .
RUN npm install
COPY . .
RUN ["npm", "run", start]
```

##### 2. Vad saknar detta build-kommando?

```
docker build .
```

##### 3. Vad är bästa praxis för att namnge en image som vi skapar från en Dockerfile?



##### 4.  Vad gör detta kommando?

```bash
docker exec -it <container id> /bin/bash
```



##### 5. Hur *override* vi en images default command i runtime?



##### 6. I Dockers officiella dokumentation listar dom ett antal bästa praxis för att bygga egna images; nämn några av dessa.



##### 7. Vad menas med *containerization*?



##### 8. Vad är en Docker Container?



##### 9. Vad är en Dockerfile?



##### 10. Beskriv en containers livscykel



##### 11. Hur pushar du en image till Docker hub?



##### 12. Hur tar du bort en stoppad container?



##### 13. Vad är Docker Compose?



##### 14. Vad är en Docker image?



##### 15. Hur skulle du beskriva "att arbeta med Docker"?



##### 16. Nämn några exempel på Dockerfile instruktioner som inte skapar ett nytt lager



### 2. Dockerfile

Övningar **1.1** och **1.2** är båda python-applikationer. Som base image använder ni er av pythons officiella Docker Image.

https://hub.docker.com/_/python

```dockerfile
FROM python
```

Det funkar kanon att använda er av den, förbättringsområden är två:

1. Ni kan välja en mindre version av python för att minska på storlek
2. Ni kan välja att använda er av en speciell version för

Nästa steg är att installera dependencies. Detta gör ni med **pip** https://pip.pypa.io/en/stable/user_guide/. Med python kommer **pip3** vilket är kommandot ni ska använda efter att ha kopierat över requirements-filen.

```
RUN pip3 install -r requirements.txt
```

Därefter, efter lite kopierande av filer från lokalt in i imagen, är det i princip, "bara" att specificera start kommando för containern. Denna info kommer att ges i pseudo-koden.

#### 2.1 Flask applikation

###### Din uppgift

```pseudocode
Skapa en Dockerfile för en Flask app.

Information som ni behöver:

1. Flask app default port: 5000
2. Dependencies, vad applikationen behöver ha installerat för att kunna köras, finns i requirements.txt.
		Ni behöver därför installera dessa dependencies för att kunna köra 			applikationen.
3. Kommandot för att starta igång applikation, vilket även är kommandot som ska köra när containern kör,
```

###### Psuedokod

```pseudocode
Dockerfile
1. Välj en base image. I detta fall räcker det med FROM python
2. Skapa ett WORKDIR /app
3. Vi behöver nu installera våra dependecies så kopiera över requirements.txt in i WORKDIR
4. Installera dependencies
5. Kopiera över allt från lokalt in i imagen
6. Specificera kör-kommandot CMD ["python3","app.py"]

Docker Build
1. Kör docker build -t yourusername/repository-name:version .
2. docker run -p 5000:5000 yourusername/repository-name:version
3. push imagen till docker hub.
docker push yourusername/repository-name:version
```

Om ni har fått det att fungera kan ni fundera kring förbättringsmöjligheter. 

#### 2.2 Django applikation

###### Din uppgift

```pseudocode
Skapa en Dockerfile för en Django app

Informationen som ni behöver:

1.Django app default port: 8000
2. Dependencies, vad applikationen behöver ha installerat för att kunna köras, finns i requirements.txt.
		Ni behöver därför installera dessa dependencies för att kunna köra 			 applikationen.
3. Kommandot för att starta igång applikation, vilket även är kommandot som ska köra när containern körs är
		python3 manage.py runserver 0.0.0.0:8000
```

###### Pseudokod

```pseudocode
1. Välj en base image. Försök att hitta en smalare variant av python.
https://hub.docker.com/_/python?tab=tags
2. Skapa ett WORKDIR /app
3. Vi behöver nu installera våra dependecies så kopiera över requirements.txt in i WORKDIR
4. Installera dependencies 
5. Kopiera över allt från lokalt in i imagen
6. Specificera kör-kommandot
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

Docker Build
1. Kör docker build -t yourusername/repository-name:version .
2. docker run -p 8000:8000 yourusername/repository-name:version
3. push imagen till docker hub.
```

Om ni har fått det att fungera, kör då en shell inne i containern.

```
docker exec -it <container id> sh

ls
```

Behövs verkligen allt där i? **venv**? 

Skapa en .dockerignore-fil och lägg till venv

**.dockerignore**

```
*/venv
```



#### 2.3 Node applikation

Ni ställs nu inför en utmaning. Skapa en Dockerfile från JavaScript, som ni inte har någon erfarenhet från.

Hur ska vi tänka?

Stegen är de samma; tänk att en Dockerfile i nästan alla fall har samma uppbyggnad:

```
1. Specificera base image
FROM baseimage
2. installera dependencies
RUN kommando
3. Bestäm kör-kommando
CMD [""]
```

###### Din uppgift

```
Skapa en Dockerfile för en Node app

Informationen som ni behöver:

1. I index.js kan ni hitta information om vilken port applikationen lyssnar på

const PORT = process.env.PORT || 3001;

process.env.PORT om den är satt, annars port 3001. Utgå ifrån port 3001.

2. Dependencies, vad applikationen behöver ha installerat för att kunna köras, finns i package.json.
		Ni behöver därför installera dessa dependencies för att kunna köra 			 applikationen.
3. Kommandot för att starta igång applikation, vilket även är kommandot som ska köra när containern körs är
		node index.js
```

Vi kan alltså se ett samband mellan python och node.

```
Python																node

requirements.txt 											package.json

pip																		npm

pip3 install -r requirements.txt			npm install		 

Python3 index.py											node index.js
```

###### Pseudokod

```
1. Välj en base image. FROM node går absolut att använda, men det kanske är lite väl stor för en så liten applikation?
https://hub.docker.com/_/node
*hint* node:alpine
2. Skapa ett WORKDIR /app
3. Vi behöver nu installera våra dependecies så kopiera över package.json in i WORKDIR
4. Installera dependencies (npm install)
5. Kopiera över allt från lokalt in i imagen
6. Specificera kör-kommandot
CMD ["node", "index.js"]

Docker Build
1. Kör docker build -t yourusername/repository-name:version .
2. docker run -p 3001:3001 yourusername/repository-name:version
3. push imagen till docker hub.
```

Nu tillbaks till.

```
const PORT = process.env.PORT || 3001;
```

Se vad som händer om du lägger till

```
ENV PORT=7000
```

i din Dockerfile.

ENV är en **environment variable** och används för att bestämma variablar som ska köra i vår container. Dessa brukar användas när vi använder oss av databaser exempelvis som kanske kräver ett lösenord.

#### 2.4 multi-stage build med golang

Nytt programmeringsspråk, ~~nya problem~~ samma tänk.

1. Vi börjar som vanligt med en base image.

2. Vi fortsätter med att installera dependencies.

3. Vi avslutar med att välja kör-kommando.

Golang är ett programmeringsspråk som blir *compiled*. Det betyder att vi först *compile* koden vi skriver till maskinkod innan vi kör koden. Där vi tidigare har använt oss av 

```
pip3 install -r requirements.txt

npm install
```

Kör vi nu

```
go mod init
go build -0 webserver .
```

###### Din första uppgift 

```
Skapa en Dockerfile för en Go app

Informationen som ni behöver:

1. I main.go kan ni se att port är satt till 8080.

2. Dependencies, vad applikationen behöver ha installerat för att kunna köras, 
installeras automatiskt med go build.
	
3. Kommandot för att starta igång applikation, vilket även är kommandot som ska köra när containern körs är
		CMD ["./webserver"]
```

###### Pseudokod

```
Dockerfile
1. Välj base image: golang:1.8
https://hub.docker.com/_/golang
FROM golang:1.8
2. Välj WORKDIR. Golang funkar som så att den vill ha koden i /go/src
WORKDIR /go/src/app
3. kopiera över main.go till imagen
COPY main.go .
4. Compile koden ihop med dependencies
RUN go build -o webserver .
5. Välj kör-kommando
CMD ['./webserver']
Docker CLI
1. docker build -t go-app .
2. docker images

REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
go-app       latest    d4f46ef9c6fd   4 seconds ago   719MB
```

###### Din andra uppgift 

```
Reducera image size genom att använda dig av multi-stage build
```

Tidigare har vi lärt oss om att använda oss av mer slimmade base images för att reducera image size, nästa verktyg i vår verktygslåda är **multi-stage build**.

Målet är att dela upp Dockerfilen i olika stages. 

```
FROM golang:alpine AS builder

WORKDIR /go/src/app/
COPY main.go /go/src/app
RUN go mod init 
RUN go build -o webserver .

FROM alpine
WORKDIR /app/
COPY --from=builder /go/src/app/ ./
CMD ["./webserver"]
```

```
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
go-app-3     latest    43dce2485caa   4 minutes ago    11.7MB
```

#### 3. Docker Compose

*Compose* is a tool for defining and running multi-container *Docker* applications. With *Compose*, you use a YAML file to configure your application's services.

**https://docs.docker.com/compose/**

Att använda Docker Compose är i stort sett en 3-stegs process:

1. Definera din applikations *environment* i en Dockerfile så att den kan reproduceras överallt:

**Dockerfile**

```
FROM node:alpine
COPY package.json .
RUN npm install
```

2. Definera applikationens services som bygger applikationen

**docker-compose.yml**

```
version: "3.9" 
services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: redis

```

3. kör docker-compose up vilket startar applikation

```
docker-compose up
```



#### 3.1 Flask Redis

https://docs.docker.com/compose/gettingstarted/

###### Din uppgift

```
Följ stegen i guiden
```
