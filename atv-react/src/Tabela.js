import React from "react";
import Form from './Form';

const Tabela = ({tabela}) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                        {this.state.cidade}
                        </th>
                        <th>
                        - {this.props.UF}
                        </th>
                        <th>
                        - {this.props.diaSearch}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            linhaS
                        </td>
                    </tr>
                </tbody>
            </table>
        )
}

export default Tabela;
