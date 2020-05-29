import React from 'react';
import Tabela from './Tabela';

export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            cidades: '',
        };
    }

    changeNome = event => {
        this.setState({
            nome: event.target.value.toLowerCase()
        });
        if (this.state.nome.length >= 3) {
            let cid = this.state.value;
            fetch(`http://servicos.cptec.inpe.br/XML/listaCidades?city=${cid}`,{method:"GET"})
            .then(response => response.arrayBuffer())
            .then(buffer => {
                let decoder = new TextDecoder("iso-8859-1");
                return decoder.decode(buffer);
            })
            .then(str => {
                let parser = new window.DOMParser()
                let xml = parser.parseFromString(str, "text/xml");
                let cidades = xml.getElementsByTagName('cidades')[0]; // Obter a tag cidades
                let lista = [];
                cidades.childNodes.forEach((obj, index) => {
                    lista.push(obj.childNodes[0].childNodes[0].nodeValue)
                });
                console.log(lista);
            })
            .catch(erro => console.log(erro) );
        }
    };

    changeCidade = event => {
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit} >
                    <div>
                        <label>Nome</label>
                        <input type='text' name='idade' value={this.state.nome}
                                onChange={this.changeNome} />
                        <label>Cidade</label>
                        <select name='cidade' value={this.state.cidade}
                            onChange={this.changeCidade} >
                            <option>{cidade}</option>
                        </select>
                    </div>
                    <div>
                        {this.state.erroMsg}
                    </div>
                </form>
                <Tabela lista={this.state.cidade} />
            </div>
        );
    }
}


