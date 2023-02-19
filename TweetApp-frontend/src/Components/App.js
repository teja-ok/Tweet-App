import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUpForm';
import SignIn from './SignInForm';
import Logout from './Logout';
import TweetFeed from './TweetFeed';
import FollowersFeed from './FollowersFeed';
import FollowingFeed from './FollowingFeed';
import NavigationBar from './NavigationBar';
import ReplyForm from './ReplyForm';
import TweetForm from './TweetForm';
import SnackBar from './SnackBar';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path='/' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/home' element={<TweetFeed />} />
        <Route path='/following' element={<FollowingFeed />} />
        <Route path='/followers' element={<FollowersFeed />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/replyform' element={<ReplyForm />} />
        <Route path='/tweetform' element={<TweetForm />} />
        <Route path='/snackbar' element={<SnackBar />} />
        <Route path='/NavigationBar' element={<NavigationBar />} />
      </Routes>
    </Router >
    </div>
  );
}

export default App;
