//Declaração de variáveis
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/calculadora.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const calculadora_proto = grpc.loadPackageDefinition(packageDefinition);

const servidor = new grpc.Server();

servidor.addService(calculadora_proto.Calculadora.service, {
  Soma: soma,
  Subtracao: subtracao,
  Multiplicacao: multiplicacao,
  Divisao: divisao,
});

servidor.bindAsync(
  "localhost:50051",
  grpc.ServerCredentials.createInsecure(), 
  () => { servidor.start(); }
);

// Funções
function soma(call, callback) {
  const { primeiroNum, segundoNum } = call.request;
  callback(null, {
    resultado: primeiroNum + segundoNum,
  });
}

function subtracao(call, callback) {
  const { primeiroNum, segundoNum } = call.request;
  callback(null, {
    resultado: primeiroNum - segundoNum,
  });
}

function multiplicacao(call, callback) {
  const { primeiroNum, segundoNum } = call.request;
  callback(null, {
    resultado: primeiroNum * segundoNum,
  });
}

function divisao(call, callback) {
  const { primeiroNum, segundoNum } = call.request;
  callback(null, {
    resultado: primeiroNum / segundoNum,
  });
}