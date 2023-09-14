package rw.qt.service;

import java.util.List;

import rw.qt.dto.UserDTO;

public interface PortalService {
    List<UserDTO> findAll();

    UserDTO getOne(int id);
}
