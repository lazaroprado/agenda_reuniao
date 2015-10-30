/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.interfaces;

import br.unisal.model.Reuniao;
import java.util.List;

/**
 *
 * @author Lazaro
 */
public interface ReuniaoInterface {
    void insert(Reuniao r);
    void update(Reuniao r);
    void remove(Reuniao r);
    Reuniao getById(Integer id);
    List<Reuniao> getAll();
    
}
