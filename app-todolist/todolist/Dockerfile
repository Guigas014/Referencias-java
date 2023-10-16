# Arquivo usado para configurar o docker no deploy.
# Pois o serviço Render.com não aceita aplicativos JAVA. 

FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y

COPY . .

RUN apt-get install maven -y
#Esse comando cria o arquivo todolist-1.0.0.jar na pasta target.
RUN mvn clean install         

FROM openjdk:17-jdk-slim

EXPOSE 8080

COPY --from=build /target/todolist-1.0.0.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
