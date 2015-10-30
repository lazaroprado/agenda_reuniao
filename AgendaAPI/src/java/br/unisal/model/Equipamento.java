/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 *
 * @author Lazaro
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder={"idEquipamento", "nome", "descricao"})
@Entity
@Table(name = "equipamento")
public class Equipamento implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipamento")
    private Integer idEquipamento;
    @Column(length = 155, name = "nome")
    private String nome;
    @Column(length = 155, name = "descricao")
    private String descricao;

    public Equipamento() {
    }
    
    public Equipamento(Equipamento e) {
        this.idEquipamento = e.idEquipamento;
        this.nome = e.nome;
        this.descricao = e.descricao;
    }

    public Equipamento(Integer idEquipamento) {
        this.idEquipamento = idEquipamento;
    }

    public Equipamento(Integer idEquipamento, String nome) {
        this.idEquipamento = idEquipamento;
        this.nome = nome;
    }

    public Integer getIdEquipamento() {
        return idEquipamento;
    }

    public void setIdEquipamento(Integer idEquipamento) {
        this.idEquipamento = idEquipamento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idEquipamento != null ? idEquipamento.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Equipamento)) {
            return false;
        }
        Equipamento other = (Equipamento) object;
        if ((this.idEquipamento == null && other.idEquipamento != null) || (this.idEquipamento != null && !this.idEquipamento.equals(other.idEquipamento))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "br.unisal.model.Equipamento[ idEquipamento=" + idEquipamento + " ]";
    }
    
}
