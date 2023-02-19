package com.teja.tweet.controller;


import com.teja.tweet.dto.request.RequestFollow;
import com.teja.tweet.dto.request.RequestLogin;
import com.teja.tweet.dto.request.RequestUser;
import com.teja.tweet.dto.response.Followers;
import com.teja.tweet.dto.response.Following;
import com.teja.tweet.dto.response.ResponseUser;
import com.teja.tweet.service.implementation.MyUserDetailsService;
import com.teja.tweet.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tweet-app")
public class UserController {

    @Autowired
    MyUserDetailsService myUserDetailsService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/save/userDetails")
    public ResponseEntity<ResponseUser> saveUserDetails(@RequestBody RequestUser requestUser){
        var random = myUserDetailsService.saveUserDetails(requestUser);
        return ResponseEntity.ok(random);
    }

    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody RequestLogin requestLogin) throws Exception {
        try{
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    requestLogin.getUsername(),requestLogin.getPassword()));
            var user = myUserDetailsService.loadUserByUsername(requestLogin.getUsername());
            var user2=myUserDetailsService.findByEmail(user.getUsername());
            String token = jwtUtils.generateToken(user.getUsername(),user2.getId());
            return ResponseEntity.ok("Bearer "+token);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PutMapping("/followUser/{userId}")
    ResponseEntity<String> followUser(@PathVariable Integer userId, @RequestBody RequestFollow requestFollow){
        System.out.println("follow user");
        return ResponseEntity.ok(myUserDetailsService.saveFollowing(userId,requestFollow));
    }

    @GetMapping("/getFollowers/{userId}")
    ResponseEntity<List<Followers>> getFollowers(@PathVariable Integer userId){
        return ResponseEntity.ok(myUserDetailsService.loadFollowers(userId));
    }

    @GetMapping("/getMyFollowing/{userId}")
    ResponseEntity<List<Following>> getMyFollowing(@PathVariable Integer userId){
        return ResponseEntity.ok(myUserDetailsService.loadFollowing(userId));
    }

    @PutMapping("/unfollow/{userId}")
    ResponseEntity<String> unfollow(@PathVariable Integer userId,@RequestBody RequestFollow requestFollow){
        System.out.println("unfollow called..");
        return ResponseEntity.ok(myUserDetailsService.unfollow(userId,requestFollow));
    }

    @GetMapping("/getAllUsers/{userId}")
    public ResponseEntity<List<ResponseUser>> getAllUsers(@PathVariable Integer userId){
        return ResponseEntity.ok(myUserDetailsService.getAllUsers(userId));
    }
}
