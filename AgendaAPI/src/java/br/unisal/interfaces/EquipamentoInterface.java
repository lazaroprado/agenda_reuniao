/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.interfaces;

import br.unisal.model.Equipamento;
import java.util.List;

public interface EquipamentoInterface {
    void insert(Equipamento p);
    void update(Equipamento p);
    void remove(Equipamento p);
    Equipamento getById(Integer p);
    List<Equipamento> getAll();
}
