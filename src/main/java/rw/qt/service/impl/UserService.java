package rw.qt.service.impl;

import java.util.List;

import rw.qt.entity.User;

public interface UserService {
    User save(User user);

    List<User> findAll();

    User findById(long id);

    void deleteById(long id);

    boolean isExists(String username);

    boolean isExistsById(long id);

    User findByUsername(String username);
}
