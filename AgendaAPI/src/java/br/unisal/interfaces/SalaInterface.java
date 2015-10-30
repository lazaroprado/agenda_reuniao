/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.interfaces;

import br.unisal.model.Sala;
import java.util.List;

/**
 *
 * @author Lazaro
 */
public interface SalaInterface {
    void insert(Sala s);
    void update(Sala s);
    void remove(Sala s);
    Sala getById(Integer id);
    List<Sala> getAll();
}
