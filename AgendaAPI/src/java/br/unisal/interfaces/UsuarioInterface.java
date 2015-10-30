/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.interfaces;

import br.unisal.model.Usuario;
import java.util.List;

public interface UsuarioInterface {
    void insert(Usuario p);
    void update(Usuario p);
    void remove(Usuario p);
    Usuario getById(Integer p);
    List<Usuario> getAll();
}
