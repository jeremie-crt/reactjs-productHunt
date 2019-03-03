class HelloWorld extends React.Component {
    
    render() {
        
        return (<p className='important'>Enjoy your time with us</p>);
    }
}

class ProductList extends React.Component {
    
    constructor(props) {
        //Call parent's method
        super(props);
        //Create a clone of the Products Objet
        this.state = { products : window.dataProducts };
    }
    //onProductUpVote(productID) {}
    onProductUpVote = (productID) => {
        const UpdatedProduct = this.state.products.map(
            function(product) {
                if(product.id == productID) {
                    return Object.assign({}, product, {votes: product.votes + 1 });
                } 
                // OU
                /*if(product.id == productId)
                {
                    let newProduct;

                    newProduct = Object.assign({}, product);
                    newProduct.votes++;

                    return newProduct;
                }*/
                return product;
            }
        );
        //Rewrites Products Objet with new data
        this.setState({products : UpdatedProduct});
    };

    render() {
        
        const products = this.state.products.sort((a, b) => (b.votes - a.votes) ); 
        const productComponents = products.map( (product) => (
                <Product 
                    id={product.id} 
                    key={product.id} 
                    title={product.title} 
                    description={product.description} 
                    url={product.url} 
                    votes={product.votes} 
                    submitterAvatarUrl={product.submitterAvatarUrl} 
                    imageUrl={product.imageUrl} 
                    //onProductUpVote={this.onProductUpVote.bind(this)} />
                    onProductUpVote={this.onProductUpVote} />
            ) ); 
        
        return (
        <div className='ui items'>
            {productComponents}
        </div>
        );
    }
}

class Product extends React.Component {

   /* onUpVote() {
        this.props.onProductUpVote(this.props.id);
        //this.props.votes ++; CANNOT WRITE CODE THIS WAY. READING ONLY. PROPS CANNOT BE MODIFIED. REACTS'S CONSTANTLY WATCHING ANY CHANGE IN ORDER TO REFRESH, WHY IT'S LOCKED IN WRITING DIRECTLY WITH PROPS.
    }*/

    onUpVote = () => {
        this.props.onProductUpVote(this.props.id);
        //this.props.votes ++; CANNOT WRITE CODE THIS WAY. READING ONLY. PROPS CANNOT BE MODIFIED. REACTS'S CONSTANTLY WATCHING ANY CHANGE IN ORDER TO REFRESH, WHY IT'S LOCKED IN WRITING DIRECTLY WITH PROPS.
    };

    render() {
        
        return (
            <div className="item" id='item-elmt'>
                <div className="image">
                    <img src={this.props.imageUrl}/>
                </div>
                <div className="content aligned middle">
                    <div className="header">
                        <p><a onClick={this.onUpVote.bind(this)}>
                        <img src="images/assets/arrow-up.svg"/>
                        </a> {this.props.votes}</p>
                        <a href="" className="large caret up icon"></a>
                    </div>
                    <div className="description">
                        <a href="" className="large caret up icon" target="_blank">{this.props.title}</a>
                        <p>{this.props.description}</p>
                    </div>
                    <div className="extra">
                        <p>Proposé par : <img src={this.props.submitterAvatarUrl} className="ui avatar image"/></p>
                    </div>
                </div>
            </div>
          );
    }
}

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value.toUpperCase()});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
    render() {
        return ( 
        <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>);
    }
}
ReactDOM.render( <div><HelloWorld/><ProductList/><Form/></div>, document.querySelector('main') );