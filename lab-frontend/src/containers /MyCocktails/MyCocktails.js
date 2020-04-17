import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCocktails} from "../../store/actions/cocktailsAction";
import {Card, CardBody, CardDeck, CardImg, CardText, CardTitle, Col} from "reactstrap";

class MyCocktails extends Component {
    componentDidMount() {
        this.props.getCocktails(this.props.user._id)
    }

    render() {
        const cocktails = this.props.cocktails;
        console.log(this.props.cocktails && this.props.cocktails.map(item => item.ingredients.map(ing => ing.name)));
        console.log(this.props.user._id);
        return (
            <>
                <CardDeck>
                    {cocktails &&
                        cocktails.map((cocktail, i) => (
                            <Col key={cocktail._id} md={4}>
                                <Card>
                                    <CardImg top width="100%" src={`http://localhost:8000/uploads/${cocktail.image}`} alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle><b>Название коктейля:</b>{cocktail.name}</CardTitle>
                                        <ul>
                                            {cocktail.ingredients.map(ing => (
                                                <li key={ing.name}>{ing.name} - {ing.amount}</li>
                                            ))}
                                        </ul>
                                        <CardText><b>Recipe:</b></CardText>
                                        <CardText>{cocktail.recipe}</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    }
                    {!cocktails[0] && <h1>У вас нет коктейлей</h1>}

                </CardDeck>
            </>
        );
    }
}

const mapStateToProps = state => ({
   user: state.users.user,
   cocktails: state.cocktails.cocktails
});

const mapDispatchToProps = dispatch => ({
   getCocktails: id => dispatch(getCocktails(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCocktails);