/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.dao;

import br.unisal.hibernate.util.HibernateUtil;
import br.unisal.interfaces.EquipamentoInterface;
import br.unisal.model.Equipamento;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author jether
 */
public class EquipamentoDao implements EquipamentoInterface {

    public EquipamentoDao() {
    }
    
    @Override
    public void insert(Equipamento s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.save(new Equipamento(s));
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception EquipamentoDao.insert(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }
    
    @Override
    public void update(Equipamento s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.update(s);
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception EquipamentoDao.update(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public List<Equipamento> getAll() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        List<Equipamento> equipamentos = new ArrayList<>();
        try {
            tx.begin();
            Query query = session.createQuery("FROM Equipamento");
            equipamentos = query.list();
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception EquipamentoDao.getAll(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
        return equipamentos;
    }
    
    @Override
    public Equipamento getById(Integer id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        Equipamento equipamento = new Equipamento();
        try {
            tx.begin();
            Query query = session
                    .createQuery("FROM Equipamento WHERE id_equipamento = :id");
            query.setParameter("id", id);
            equipamento = (Equipamento) query.uniqueResult();
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception EquipamentoDao.getById(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
        return equipamento;
    }

    @Override
    public void remove(Equipamento s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.delete(s);
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception EquipamentoDao.remove(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }
    
}
