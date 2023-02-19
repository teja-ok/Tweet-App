package com.teja.tweet.service.implementation;

import com.teja.tweet.dto.request.RequestFollow;
import com.teja.tweet.dto.request.RequestUser;
import com.teja.tweet.dto.response.Followers;
import com.teja.tweet.dto.response.Following;
import com.teja.tweet.dto.response.ResponseUser;
import com.teja.tweet.model.Users;
import com.teja.tweet.repository.UserRepository;
import com.teja.tweet.security.MyUserDetails;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserRepository userRepository;

    public ResponseUser saveUserDetails(RequestUser requestUser) {
        var user = modelMapper.map(requestUser, Users.class);
        var responseUser=modelMapper.map(userRepository.save(user),ResponseUser.class);
        return responseUser;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> user = Optional.ofNullable(userRepository.findByEmail(username));
        return user.map(MyUserDetails::new).orElse(null);
//        var user= userRepository.findByEmail(username);
//        return new MyUserDetails(user.orElseThrow());
    }

//    public String userLogin(RequestLogin requestLogin) throws Exception {
//        try {
//            var user = userRepository.findByEmail(requestLogin.getUsername());
//            if(requestLogin.getPassword().equals(user.orElseThrow().getPassword()))
//                return "valid user";
//            return "invalid credentials";
//
//        }
//        catch (Exception e){
//            throw new Exception("user not found");
//        }
//    }

    public List<ResponseUser> getAllUsers(Integer userId) {
        List<ResponseUser> usersList = new ArrayList<>();
        var list1= loadFollowing(userId);
        var list2 = userRepository.findAll();
        for(Users users : list2){
            Boolean flag=false;
            for(Following following : list1){
                if(users.getId()== following.getUserId()){
                    flag=true;
                    break;
                }
            }
            if(!flag) usersList.add(modelMapper.map(users,ResponseUser.class));
        }
//        .forEach(user-> usersList.add(modelMapper.map(user,ResponseUser.class)));
        return usersList;
    }

    public List<Followers> loadFollowers(Integer userId) {
        var user=userRepository.findById(userId);
        List<Followers> listOfFollowers = new ArrayList<>();
        var followers=user.get().getFollowers();
        if(followers==null){
            return listOfFollowers;
        }
        for(Integer user1 : followers){
            listOfFollowers.add(new Followers(user1,userRepository.findById(user1).get().getEmail()));
        }
        return listOfFollowers;
    }

    public List<Following> loadFollowing(Integer userId) {
        var user=userRepository.findById(userId);
        List<Following> listOfFollowing=new ArrayList<>();
        var following=user.get().getFollowing();
        if(following==null) {
            return listOfFollowing;
        }
        for(Integer user1 : following){
            listOfFollowing.add(new Following(user1,userRepository.findById(user1).get().getEmail()));
        }
        System.out.println(listOfFollowing);
        return listOfFollowing;
    }

    public String saveFollowing(Integer userId, RequestFollow requestFollow) {

        var user1=userRepository.findById(userId);
        System.out.println("user1 is "+user1);
        var following=user1.get().getFollowing();
        System.out.println("following is "+following );
        List<Integer> list1=new LinkedList<>();
        if(following==null){
            System.out.println("following is null");
        }
        else if(following.length!=0){
            for(Integer id : following){
                list1.add(id);
            }
//            list1=Arrays.asList(following);
            System.out.println("following is not null and is " + following.length +" list1 is "+list1);
        }
//        if(list1==null) System.out.println("list1 is null");
        System.out.println("list1 length is "+list1.size());
        list1.add(requestFollow.getUserId());
        System.out.println("list1 is "+list1);
        userRepository.saveToFollowing(userId,list1.toArray(new Integer[0]));
        System.out.println("done..");

        var user2=userRepository.findById(requestFollow.getUserId());
        var followers=user2.get().getFollowers();
        List<Integer> list2=new ArrayList<>();
        if(followers==null){}
        else{
            for (Integer id : followers)
            list2.add(id);
        }
        list2.add(userId);
        userRepository.saveFollower(requestFollow.getUserId(), list2.toArray(list2.toArray(new Integer[0])));
        return "followed";
    }

    public String unfollow(Integer userId, RequestFollow requestFollow) {
        var user1=userRepository.findById(userId);
        var following=user1.get().getFollowing();
        List<Integer> list1= new LinkedList<>(Arrays.asList(following));
        list1.remove(Integer.valueOf(requestFollow.getUserId()));
        userRepository.saveToFollowing(userId,list1.toArray(Integer[]::new));

        var user2=userRepository.findById(requestFollow.getUserId());
        var follower=user2.get().getFollowers();
        List<Integer> list2=new LinkedList<>(Arrays.asList(follower));
        list2.remove(Integer.valueOf(userId));
        userRepository.saveFollower(requestFollow.getUserId(), list2.toArray(Integer[]::new));

        return "unfollowed";
    }

    public Users findByEmail(String username) {
        return userRepository.findByEmail(username);
    }
}
