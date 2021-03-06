import React from 'react';
import { Routes, Route, Navigate,Redirect  } from 'react-router-dom';

import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up-component';
import Header from './components/header/header.component'
import './App.css';
import { auth,createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions';
class App extends React.Component {
  // constructor(){
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }
  unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} =this.props;
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user});
      //createUserProfileDocument(user);
      if(userAuth){
        const userRef= await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot=>{
        //   this.setState({
        //   currentUser:{
        //     id:snapShot.id,
        //     ...snapShot.data()
        //   }
        // },()=>{
        //   console.log(this.state);
        // })
        setCurrentUser({
          id:snapShot.id,
             ...snapShot.data()
        });
        });
        
      }
      else{
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />     
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/shop' element={<ShopPage/>}/>
          {/* <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/> */}
          <Route exact path='/signin' element={<SignInAndSignUpPage/>}/>
        </Routes>
      </div>
    );
  }
  }
  
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
