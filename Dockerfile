FROM dart:3.6.0 AS build

WORKDIR /app
COPY pubspec.* ./
RUN dart pub get

COPY . .
RUN dart pub get --offline
RUN dart run build_runner build --delete-conflicting-outputs
RUN dart compile exe bin/server.dart -o bin/server

FROM scratch
WORKDIR /app
COPY --from=build /runtime/ /
COPY --from=build /app/bin/server /app/

# Copia arquivos estáticos e configurações
COPY --from=build /app/public /app/public
COPY --from=build /app/application.yaml /app/

# Railway usa a variável PORT
EXPOSE 8080
CMD ["./server"]
