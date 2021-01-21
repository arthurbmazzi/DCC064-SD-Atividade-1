//Declaração de variáveis
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/calculadora.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const calculadora_proto = grpc.loadPackageDefinition(packageDefinition);

const cliente = new calculadora_proto.Calculadora(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

console.log("Calculadora Simples com as 4 operacoes basicas:");
console.log("-------------------------------------------------\n");

cliente.Soma({ primeiroNum: 30, segundoNum: 45 }, 
  function (err, response) {
    console.log("Soma: ");
    console.log("30 + 45 = " + response.resultado + "\n");
});


cliente.Subtracao({ primeiroNum: 88, segundoNum: 52 },
  function (err, response) {
    console.log("Subtracao: ");
    console.log("88 - 52 = "  + response.resultado + "\n");
});


cliente.Multiplicacao({ primeiroNum: 10, segundoNum: 12 },
  function (err, response) {
    console.log("Multiplicacao: ");
    console.log("10 * 12 = " + response.resultado + "\n");
  }
);


cliente.Divisao({ primeiroNum: 150, segundoNum: 30 },
  function (err, response) {
    console.log("Divisao: ");
    console.log("150 / 30 = " + response.resultado + "\n");
  }
);