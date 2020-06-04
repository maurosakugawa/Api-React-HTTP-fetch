import React from 'react';
import './index.css';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cidades: '',
            cidade: '',
            previsao: '',
            erroMsg: ''
        };
        this.fetchCidades = this.fetchCidades.bind(this);
        this.fetchClima = this.fetchClima.bind(this);
    }


    getTempo = sigla => {
        return {
            'ec': 'Encoberto com Chuvas Isoladas',
            'ci': 'Chuvas Isoladas',
            'c': 'Chuva',
            'in': 'Instável',
            'pp': 'Poss. de Pancadas de Chuva',
            'cm': 'Chuva pela Manhã',
            'cn': 'Chuva a Noite',
            'pt': 'Pancadas de Chuva a Tarde',
            'pm': 'Pancadas de Chuva pela Manhã',
            'np': 'Nublado e Pancadas de Chuva',
            'pc': 'Pancadas de Chuva',
            'pn': 'Parcialmente Nublado',
            'cv': 'Chuvisco',
            'ch': 'Chuvoso',
            't': 'Tempestade',
            'ps': 'Predomínio de Sol',
            'e': 'Encoberto',
            'n': 'Nublado',
            'cl': 'Céu Claro',
            'nv': 'Nevoeiro',
            'g': 'Geada',
            'ne': 'Neve',
            'nd': 'Não Definido',
            'pnt': 'Pancadas de Chuva a Noite',
            'psc': 'Possibilidade de Chuva',
            'pcm': 'Possibilidade de Chuva pela Manhã',
            'pct': 'Possibilidade de Chuva a Tarde',
            'pcn': 'Possibilidade de Chuva a Noite',
            'npt': 'Nublado com Pancadas a Tarde',
            'npn': 'Nublado com Pancadas a Noite',
            'ncn': 'Nublado com Poss. de Chuva a Noite',
            'nct': 'Nublado com Poss. de Chuva a Tarde',
            'ncm': 'Nubl. c/ Poss. de Chuva pela Manhã',
            'npm': 'Nublado com Pancadas pela Manhã',
            'npp': 'Nublado com Possibilidade de Chuva',
            'vn': 'Variação de Nebulosidade',
            'ct': 'Chuva a Tarde',
            'ppn': 'Poss. de Panc. de Chuva a Noite',
            'ppt': 'Poss. de Panc. de Chuva a Tarde',
            'ppm': 'Poss. de Panc. de Chuva pela Manhã'
        }[sigla];
    }

    formatData = data => {
        let d = data.split('-');
        return d[2] + '/' + d[1] + '/' + d[0];
    }

    //    componentDidMount() {
    fetchCidades = e => {
        this.setState({
            nome: e.target.value
        });
        if (e.target.value.length >= 3) {
            e.preventDefault();
            let nome = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            this.setState({ erro: '' });
            fetch(`http://servicos.cptec.inpe.br/XML/listaCidades?city=${nome}`, { method: "GET" }, {
                mode: 'no-cors',
                //   mode: 'cors',
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/xml',
                    'content-type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT',
                    'Access-Control-Allow-Headers': 'Content-Type',
                })
            })
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    let decoder = new TextDecoder("iso-8859-1");
                    return decoder.decode(buffer);
                })
                .then(str => { // console.log(str);
                    let parser = new window.DOMParser()
                    let xml = parser.parseFromString(str, "text/xml");
                    let cidades = xml.getElementsByTagName('cidades')[0]; // Obter a tag cidades
                    let lista = [];
                    lista.push(<option key='-i' value='' >Selecione uma cidade</option>)
                    cidades.childNodes.forEach((obj, index) => {
                        return lista.push(<option key={index} value={obj.childNodes[2].childNodes[0].nodeValue}>{obj.childNodes[0].childNodes[0].nodeValue} - {obj.childNodes[1].childNodes[0].nodeValue}</option>)
                    });

                    this.setState({cidades: lista})
                    console.log(cidades);

                })
                .catch(erro => console.log(erro));
        }
    }



    fetchClima = e => {
        if (e.target.value !== '') {
            fetch(`http://servicos.cptec.inpe.br/XML/cidade/4963/previsao.xml`, { method: 'GET' })
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    let decoder = new TextDecoder("iso-8859-1");
                    return decoder.decode(buffer);
                })
                .then(str => { // console.log(str);
                    let parser = new window.DOMParser()
                    let xml = parser.parseFromString(str, "text/xml");
 //                   console.log(xml);
                    let cidade = xml.getElementsByTagName('nome')[0];
   //                 console.log(cidade);
                    let UF = xml.getElementsByTagName('uf')[0];
    //                console.log(UF);
                    let diaSearch = xml.getElementsByTagName('atualizacao')[0];
     //               console.log(diaSearch);
                    let prev = xml.getElementsByTagName('previsao')[0];
     //               console.log(prev);
                    let lista = [];
     //               var tabela = '';
     //               tabela.push(<thead>{cidade} - {UF} - {diaSearch}}</thead>)
      //              cidade.childNodes.forEach((obj, index) => {
     //                  lista.push(<option key={index} value={obj.childNodes[2].childNodes[0].nodeValue}>{obj.childNodes[0].childNodes[0].nodeValue} - {obj.childNodes[1].childNodes[0].nodeValue}</option>)
     //               });

    //                this.setState({ tabela: {tabela} });
                });
            }
        };

        render(){

            var cidades = this.state.cidades;
            console.log(cidades);
     //       var fetchCidades = this.state.fetchCidades;
            return (
                <div>
                    <form onSubmit={this.fetchCidades} >
                        <div>
                            <label>Nome:
                            <input type='text' value={this.state.value}
                                onChange={this.fetchCidades}
                                placeholder="digite o nome completo"
                            />
                            </label>
                        </div>
                        <div>
                            <label>Cidades:
                            <select onClick={this.fetchClima} value={this.state.lista}
                                onChange={this.fetchClima} defaultValue="Selecione a cidade" >

                                          {cidades}

                            </select>
                            </label>
                        </div>
                        <div>
                            {this.state.erroMsg}
                        </div>
                    </form>
                </div>
            );
        }
    
}

