## Instalação do k6

- Install

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

- Se você não conseguir obter a chave devido a firewalls ou proxies, tente a seguinte alternativa:

```bash
curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
```

## Solicitação HTTP GET

- HTTP GET request

    - Você pode definir seu primeiro caso de teste utilizando o httpmódulo integrado. Crie um novo arquivo JavaScript em seu diretório de trabalho. Eu só vou chamá-lo script.js. Em seguida, adicione o seguinte código, que representa uma solicitação GET simples:

    ```js
    import http from 'k6/http';
    import { sleep } from 'k6';
    export default function () {
    http.get('http://example.com/test');
    sleep(1);
    }
    ```

    - Cada VU um executará o código dentro da função padrão sequencialmente do início ao fim. Quando chegar ao fim, ele retornará e o processo será repetido novamente.

    - É sempre uma boa ideia controlar seus VUs adicionando uma sleepinstrução no final da função padrão. Isso simula como usuários reais usam seu sistema. Você pode  definir o valor mais baixo 0.1para simular comportamentos agressivos. Se você pretende simular usuários que chamam constantemente sua API, basta remover a sleepinstrução.

    - Se você não possui uma API no momento e deseja apenas testar o k6, pode usar a seguinte API de teste fornecida pelo k6:

        - http://test.k6.io
    
## Métricas coletadas

- Por padrão, o k6 coletará as seguintes métricas sempre que você executar um teste:

    - `vus_max` — máximo de usuários virtuais alocados para o teste
    - `iterations` — número agregado de vezes que a defaultfunção é chamada
    - `iteration_duration` — o tempo total que levou para executar a defaultfunção
    - `dropped_iterations` - número de iterationsque não pôde ser iniciado
    - `data_received` — quantidade de dados recebidos
    - `data_sent` — quantidade de dados enviados
    - `checks` — taxa de verificações bem-sucedidas (será discutido mais tarde)

- Além disso, ele também gerará a seguinte saída se você estiver chamando solicitações HTTP:

    - `http_reqs` — total de solicitações geradas por k6
    - `http_req_blocked` — tempo gasto esperando por uma conexão TCP livre antes de iniciar a solicitação
    - `http_req_connecting` — tempo gasto estabelecendo uma conexão TCP
    - `http_req_tls_handshaking` — tempo gasto em handshake TLS
    - `http_req_sending` — tempo gasto no envio de dados
    - `http_req_waiting` — tempo gasto esperando por uma resposta do host remoto
    - `http_req_receiving` — tempo gasto no recebimento de dados
    - `http_req_duration` — tempo total para a solicitação. É calculado com base em http_req_sending+ http_req_waiting+http_req_receiving.

## Testes

- Uma boa maneira de testar suas APIs é aumentar e diminuir os níveis de VU. O código a seguir ilustra como você pode configurá-lo para ser executado em estágios.

```js
export let options = { 
  stage: [ 
    {duração: '10s', meta: 20 }, 
    { duração: '1m10s', meta: 10 }, 
    { duração: '10s', meta: 0 }, 
  ], 
};
```
    - Indo de 1 a 20 VUs nos primeiros 10 segundos
    - Transição lenta para 10 VUs nos próximos 70 segundos
    - Passar de 10 a 0 UVs nos últimos 10 segundos

- Teste de carga
    - Para teste de carga, você deve aumentar o VU para uma boa quantidade e mantê-lo por um período fixo de tempo antes de reduzi-lo para 0. Observe o exemplo a seguir, que usa 100 VUs.

    ```js
    export let options = { 
        stage: [ 
            {duração: '5m', meta: 100 }, 
            { duração: '10m', meta: 100 }, 
            { duração: '5m', meta: 0 }, 
        ], 
    };
    ```

- Teste de estresse
    - Por outro lado, o teste de estresse envolve o aumento constante de VUs gradualmente ao longo de um período de tempo. Você pode começar com 100 VUs e incrementar em 100 VUs de cada vez. Em seguida, você reduz a velocidade como parte da fase de recuperação.

    ```js
    export let options = { 
        stage: [ 
            {duração: '1m', meta: 100 }, 
            { duração: '5m', meta: 100 }, 
            { duração: '1m', meta: 200 }, 
            { duração: '5m' , meta: 200 }, 
            { duração: '1m', meta: 300 }, 
            { duração: '5m', meta: 300 }, 
            { duração: '1m', meta: 400 }, 
            { duração: '5m', meta : 400 }, 
            { duração: '5m', alvo: 0 }, 
        ], 
    };
    ```

- Teste de pico
    - O teste de pico visa sobrecarregar seu sistema com um aumento repentino de carga em um curto período de tempo. Você pode configurá-lo facilmente da seguinte maneira:

    ```js
    export let options = { 
        stage: [ 
            {duração: '10s', meta: 100 }, 
            { duração: '2m', meta: 100 }, 
            { duração: '10s', meta: 1000 }, 
            { duração: '2m' , meta: 1000 }, 
            { duração: '10s', meta: 100 }, 
            { duração: '2m', meta: 100 }, 
            { duração: '10s', meta: 0 }, 
        ], 
    };
    ```

    - Observe que aumentei de 100 para 1.000 VUs em um período de 10 segundos. Isso ajuda a avaliar o desempenho do nosso sistema quando há um aumento repentino de usuários.

## Verificações

- k6 fornece uma maneira de declarar a resposta retornada. Chama-se check. Observe que checkisso não interrompe a execução.

## Resposta HTTP

- Para sua informação, cada método HTTP retornará uma resposta HTTP que contém o seguinte:

    - body
    - headers
    - status
    - timings
    - timings.blocked
    - timings.connecting
    - timings.tls_handshaking
    - timings.sending
    - timings.waiting
    - timings.receiving
    - timings.duration

- Verificando se o status é 200:
    - Os campos mais úteis são bodye status. Você pode simplesmente atribuir a resposta HTTP retornada a uma variável e verificar se seu status é 200o seguinte:

    ```JS
    importar { verificar } de 'k6'; 
    importar http de 'k6/http';
    função padrão de exportação () { 
    let res = http.get('http://example.com/test'); 
    check(res, { 
        'é o status 200': (r) => r.status === 200, 
    }); 
    }
    ```

## Métricas integradas específicas do HTTP

| Nome da métrica | Contador | Descrição |
| --- | --- | --- |
| http_reqs | Contador | Quantos pedidos HTTP totais k6 gerou | 
| http_req_blocked | Trend | Tempo gasto bloqueado (aguardando um slot de conexão TCP livre) antes de iniciar a solicitação. Flutuador
| http_req_connecting | Trend | Tempo gasto estabelecendo conexão TCP com host remoto. Flutuador
| http_req_tls_handshaking | Trend | Tempo gasto em sessão TLS de handshaking com host remoto |
| http_req_sending	| Trend	| Tempo gasto no envio de dados para o host remoto.flutuador |
| http_req_waiting	| Trend	| Tempo gasto aguardando resposta do host remoto (também conhecido como “tempo para o primeiro byte” ou “TTFB”).flutuador |
| http_req_receber	| Trend	| Tempo gasto recebendo dados de resposta do host remoto.flutuador |
| http_req_duration	| Trend	| Tempo total para a solicitação. é igual ahttp_req_sending + http_req_waiting + http_req_receiver(ou seja, quanto tempo o servidor remoto levou para processar a solicitação e responder, sem os tempos iniciais de pesquisa/conexão de DNS).flutuador |
| http_req_failed	| Rate	| A taxa de solicitações com falha de acordo com setResponseCallback |


## Acessando temporizações HTTP a partir de um script

- Para acessar as informações de tempo de uma solicitação HTTP individual, o objeto Response.timings fornece o tempo gasto nas várias fases emEM:

    - bloqueado: igual ahttp_req_blocked.
    - conectando: igual ahttp_req_connecting.
    - tls_handshaking: igual ahttp_req_tls_handshaking.
    - envio: igual a http_req_sending.
    - esperando: igual ahttp_req_waiting.
    - recebimento: igual ahttp_req_receber.
    - duração: igual ahttp_req_duration.


## Comandos

```bash
k6 run --vus 200 --duration 30s --insecure-skip-tls-verify script-targets.js
```

```bash
k6 run script.js
```