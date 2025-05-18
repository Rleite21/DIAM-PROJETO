import '../cssFiles/CriarGrupo.css';
import Header from "../Header/Header";

function CriarGrupo() {

    return (
        <div id="criarGrupo_container">
            <div id="criarGrupo_box">
                <Header />
                <h1>Criar Grupo</h1>
                <form id="criarGrupo_form">
                    <label htmlFor="nomeGrupo">Nome do Grupo</label>
                    <input type="text" id="nomeGrupo" name="nomeGrupo" />

                    <label htmlFor="descricaoGrupo">Descrição</label>
                    <textarea id="descricaoGrupo" name="descricaoGrupo" />

                    <button
                        id="criarGrupo_Button"
                        type="submit"
                    >
                        Criar Grupo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CriarGrupo;