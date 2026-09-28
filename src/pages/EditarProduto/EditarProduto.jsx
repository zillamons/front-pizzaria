// import React, { useState, useRef } from "react"; 
// import { useEffect } from "react"; 
// import { useParams, useNavigate } from "react-router-dom"; 
// import CredentialsUser from "../../componentes/CredentialUser"; 
// import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"; 
// import api from "../../services/api"; 
 
// function EditarProduto() { 
//   const [produto, setProduto] = useState({ 
//     nome: "", 
//     descricao: "", 
//     precoVenda: 0, 
//     categoriaId: 0 
//   }); 
//   const [categoriaId, setCategoriaId] = useState(""); 
//   const [categorias, setCategorias] = useState([]); 
 
//   const { id } = useParams(); 
//   const navigate = useNavigate(); 
 
//   useEffect(() => { 
//     api 
//       .get(`/produtos/${id}`) 
//       .then((response) => { 
//         const dados = response.data.data; 
//         setProduto(dados); 
//         if (dados?.categoria?.id) { 
//           setCategoriaId(dados.categoria.id); 
//         } 
//       }) 
//       .catch((error) => { 
//         console.error(`Erro ao buscar a lista de produtos.${error}`); 
//       }); 
 
//     api 
//       .get("/categorias") 
//       .then((response) => { 
         
//         setCategorias(response.data.data); 
//       }) 
//       .catch((error) => { 
//         console.error(`Erro ao buscar a lista de categorias. ${error}`); 
//       }); 
 
//   }, []); 
 
//   const atualizarProduto = async (e) => { 
//     e.preventDefault(); // Cancela o reload da página 
     
//     try { 
//       const response = await api.put(`/produtos/${produto.id}`, produto, { 
//         headers: { 
//           "Content-Type": "application/json", 
//         }, 
//       }); 
//       console.log("Produto atualizado " + response.data); 
//       alert(`${response.data.data.nome} atualizada sucesso`); 
//       navigate("/produtos"); 
//     } catch (error) { 
//        console.error(`Não foi possível salvar o produto ${error}`); 
//     } 
//   }; 
//   const handleChange = (e) => { 
//     //setProduto({ ...produto, [e.target.name]: e.target.value }); funciona sem o codStatus 
 
//     const { name, value, type } = e.target; 
 
//     const parsedValue = name === "codStatus" ? value === "true" : value; 
 
//     setProduto((prev) => ({ 
//       ...prev, 
//       [name]: parsedValue, 
//     })); 
//   }; 
// const handleChangeCategoria = (e) => { 
//   const novoId = e.target.value; 
 
//   setCategoriaId(novoId); 
 
//   setProduto((prev) => ({ 
//     ...prev, 
//     categoriaId: novoId, 
//   })); 
// }; 
 
 
//   return (
//     <div className="container mt-4"> 
//       <MenuFuncionario /> 
//       <CredentialsUser title="Edição de Produto" /> 
 
//       <form onSubmit={atualizarProduto} className="bg-light p-4 rounded shadow"> 
//         {/* Nome do Produto */} 
//         <div className="mb-3"> 
//           <input 
//             type="text" 
//             name="nome" 
//             className="form-control" 
//             placeholder="Digite o nome do produto" 
//             value={produto.nome} 
//             onChange={handleChange} 
//             required 
//           /> 
//         </div> 
 
//         {/* Preço */} 
//         <div className="mb-3"> 
//           <input 
//             type="number" 
//             name="precoVenda" 
//             className="form-control" 
//             placeholder="Digite o preço" 
//             value={produto.precoVenda} 
//             onChange={handleChange} 
//             required 
//           /> 
//         </div> 
 
//         {/* Descrição */} 
//         <div className="mb-3"> 
//           <textarea 
//             name="descricao" 
//             className="form-control" 
//             rows="3" 
//             placeholder="Digite a descrição do produto" 
//             value={produto.descricao} 
//             onChange={handleChange} 
//             required 
//           ></textarea> 
//         </div> 

 
 
//         <div className="mb-3"> 
//           <label className="block mb-1 font-semibold">Categoria</label> 
//           <select 
//             value={categoriaId} 
//             onChange={handleChangeCategoria} 
//             className="border p-2 w-full rounded" 
//             required 
//           > 
//             <option value="">Selecione uma categoria</option> 
//             {categorias 
//               .filter((cat) => cat.codStatus === true) 
//               .map((cat) => ( 
//                 <option key={cat.id} value={cat.id}> 
//                   {cat.nome} 
//                 </option> 
//               ))} 
//           </select> 
//         </div> 
 
//         <div className="mb-3"> 
//           <h6>Ativar ou Desativar Produto</h6> 
 
//           <label> 
//             <input 
//               type="radio" 
//               name="codStatus" 
//               value="true" 
//               checked={produto.codStatus === true} 
//               onChange={handleChange} 
//             /> 
//             Ativo 
//           </label> 
//           <br /> 
//           <label>
            
//             <input 
//               type="radio" 
//               name="codStatus" 
//               value="false" 
//               checked={produto.codStatus === false} 
//               onChange={handleChange} 
//             /> 
//             Inativo
//           </label> 
//         </div> 
//         <br /> 
 
//         {/* Upload de Imagem */} 
//         <div className="mb-3"></div> 
 
//         {/* Botão de Enviar */} 
//         <button type="submit" className="btn btn-primary w-100"> 
//           Enviar 
//         </button> 
//       </form> 
//     </div> 
//   ); 
// } 
 
// export default EditarProduto;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CredentialUser from "../../componentes/CredentialUser";
import MenuFuncionario from "../MenuFuncionario/MenuFuncionario";
import api from "../../services/api";

function EditarProduto() {
    const [produto, setProduto] = useState({
        id: "",
        nome: "",
        descricao: "",
        precoVenda: 0,
        categoriaId: "",
        codStatus: true,
        tipo: "Grande",
    });

    const [categoriaId, setCategoriaId] = useState("");
    const [categorias, setCategorias] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    // Buscar produto e categorias
    useEffect(() => {
        const buscarDados = async () => {
            try {
                // Buscar produto
                const respostaProduto = await api.get(`/produtos/${id}`);

                const dados = respostaProduto.data.data;

                console.log("Produto recebido:", dados);

                const idCategoria = dados?.categoria?.id
                    ? String(dados.categoria.id)
                    : "";

                setProduto({
                    ...dados,
                    precoVenda: Number(dados.precoVenda),
                    categoriaId: idCategoria,
                });

                setCategoriaId(idCategoria);

                // Buscar categorias
                const respostaCategorias = await api.get("/categorias");

                console.log(
                    "Categorias recebidas:",
                    respostaCategorias.data
                );

                setCategorias(respostaCategorias.data.data);

            } catch (error) {
                console.error(
                    "Erro ao carregar dados:",
                    error.response?.data || error
                );
            }
        };

        buscarDados();
    }, [id]);

    // Alterar campos do produto
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduto((prev) => ({
            ...prev,
            [name]:
                name === "codStatus"
                    ? value === "true"
                    : name === "precoVenda"
                        ? Number(value)
                        : value,
        }));
    };

    // Alterar categoria
    const handleChangeCategoria = (e) => {
        const novoId = e.target.value;

        setCategoriaId(novoId);

        setProduto((prev) => ({
            ...prev,
            categoriaId: novoId,
        }));
    };

    // Atualizar produto
    const atualizarProduto = async (e) => {
        e.preventDefault();

        const dadosAtualizados = {
            nome: produto.nome,
            descricao: produto.descricao,
            precoVenda: Number(produto.precoVenda),
            categoriaId: Number(categoriaId),
            codStatus: produto.codStatus,
            tipo: produto.tipo,
        };

        console.log("ID do produto:", produto.id);
        console.log("Dados enviados:", dadosAtualizados);

        try {
            const response = await api.put(
                `/produtos/${produto.id}`,
                dadosAtualizados,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(
                "Produto atualizado:",
                response.data
            );

            alert(
                `${response.data.data.nome} atualizado com sucesso!`
            );

            navigate("/produtos");

        } catch (error) {
            console.error(
                "Não foi possível atualizar o produto:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Resposta do servidor:",
                error.response?.data
            );
        }
    };

    return (
        <div className="container mt-4">

            <MenuFuncionario />

            <CredentialUser title="Edição de Produto" />

            <form
                onSubmit={atualizarProduto}
                className="bg-light p-4 rounded shadow"
            >

                {/* Nome */}
                <div className="mb-3">
                    <label className="form-label">
                        Nome do Produto
                    </label>

                    <input
                        type="text"
                        name="nome"
                        className="form-control"
                        placeholder="Digite o nome do produto"
                        value={produto.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Preço */}
                <div className="mb-3">
                    <label className="form-label">
                        Preço
                    </label>

                    <input
                        type="number"
                        name="precoVenda"
                        className="form-control"
                        placeholder="Digite o preço"
                        value={produto.precoVenda}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                {/* Descrição */}
                <div className="mb-3">
                    <label className="form-label">
                        Descrição
                    </label>

                    <textarea
                        name="descricao"
                        className="form-control"
                        rows="3"
                        placeholder="Digite a descrição do produto"
                        value={produto.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Categoria */}
                <div className="mb-3">
                    <label className="form-label">
                        Categoria
                    </label>

                    <select
                        value={categoriaId}
                        onChange={handleChangeCategoria}
                        className="form-select"
                        required
                    >
                        <option value="">
                            Selecione uma categoria
                        </option>

                        {categorias
                            .filter(
                                (cat) => cat.codStatus === true
                            )
                            .map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.nome}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Status */}
                <div className="mb-3">

                    <h6>
                        Ativar ou Desativar Produto
                    </h6>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="codStatus"
                            value="true"
                            checked={
                                produto.codStatus === true
                            }
                            onChange={handleChange}
                            id="statusAtivo"
                        />

                        <label
                            className="form-check-label"
                            htmlFor="statusAtivo"
                        >
                            Ativo
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="codStatus"
                            value="false"
                            checked={
                                produto.codStatus === false
                            }
                            onChange={handleChange}
                            id="statusInativo"
                        />

                        <label
                            className="form-check-label"
                            htmlFor="statusInativo"
                        >
                            Inativo
                        </label>
                    </div>

                </div>

                <br />

                {/* Botão */}
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                >
                    Enviar
                </button>

            </form>
        </div>
    );
}

export default EditarProduto;
