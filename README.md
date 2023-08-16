# WeSki

## How to run the project

1. install nx

```shell
npm install -g nx
```

2. install pnpm

```shell
npm install -g pnpm
```

3. install dependencies

```shell
npm install
```

4. create .env file in the root directory

```shell
touch .env

echo "HOTELS_SIMULATOR_URL='https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator'" >> .env
```

5. run the project

```shell
nx serve backend
nx serve frontend
```

## How to run the tests

```shell
nx test backend
```

## How to build the project

```shell
nx build backend
nx build frontend
```

> Note: The build artifacts will be stored in the `dist/` directory.



