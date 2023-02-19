package com.teja.tweet.repository;

import com.teja.tweet.model.Users;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<Users,Integer> {
//    @Query(value="select * from users where email=:username",nativeQuery = true)
    Users findByEmail(String email);

    @Transactional
    @Modifying
    @Query(value = "update users set followers=:userId1 where id=:id",nativeQuery = true)
    void saveFollower(Integer id, Integer[] userId1);

    @Transactional
    @Modifying
    @Query(value = "update users set following=:userId where id=:id",nativeQuery = true)
    void saveToFollowing(Integer id, Integer[] userId);
}
