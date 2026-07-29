import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"
 
const ListarProduto = () =>{
   
    const arrayProdutos = [
        {
             id: 1,
             codigo: 1,
             nome: "Pizza de Calabresa",
             precoVenda: 59.90,
             descricao: "Pizza de Calabresa com bastante cebola"
        },
 
        {
             id: 2,
             codigo: 2,
             nome: "Pizza de Queijo",
             precoVenda: 58.95,
             descricao: "Pizza de Queijo Mussarela com rodelas de tomate",
        },
 
        {
             id: 3,
             codigo: 3,
             nome: "Pizza de Nutella",
             precoVenda: 55.80,
             descricao: "Pizza doce com recheio de Nutella"
        }
    ]
 
   
 
 
    return (
        <div className="container">
             <MenuFuncionario/>
 
              <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-sucess">
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th> {/* Nova coluna de Ações */}
            </tr>
          </thead>
          <tbody>
            {arrayProdutos.map((produto)=> (
               
            <tr key={produto.id}>

                {/* numero */}
                <td style={{ fontSize: "13px" }}>{produto.codigo}</td>
                

                {/* nome */}
                <td style={{ fontSize: "13px" }}>{produto.nome}</td>
                <td style={{ fontSize: "13px" }}>
                     {


                        /* preço */
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(produto.precoVenda)
                     }
                </td>


                {/* descrição */}
                <td style={{ fontSize: "13px" }}> {produto.descricao}  </td>
                <td className="text-center fs-6" style={{ width: "100px" }}>


                  {/* Botão de Editar */}
                  <button
                    className="btn btn-sm btn-primary me-2">
                    <i className="fas fa-pencil-alt"></i>{"+"}
                    {/* Ícone de editar */}
                  </button>
 

                  {/* Botão de Excluir */}
                  <button
                    className="btn btn-sm btn-danger">
                    <i className="fas fa-trash-alt"></i>{"-"}
                    {/* Ícone de excluir */}
                  </button>
                </td>
              </tr>
           
 
             ))}
           
 
             
          </tbody>
        </table>
      </div>
    </div>
    )
 
 
}
 
export default ListarProduto
 