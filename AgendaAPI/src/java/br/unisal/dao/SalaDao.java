/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.dao;

import br.unisal.hibernate.util.HibernateUtil;
import br.unisal.interfaces.SalaInterface;
import br.unisal.model.Equipamento;
import br.unisal.model.Sala;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.CriteriaSpecification;

public class SalaDao implements SalaInterface {

    public SalaDao() {
    }
    
    @Override
    public void insert(Sala s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.save(new Sala(s));
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception SalaDao.insert(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }
    
    @Override
    public void update(Sala s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.update(s);
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception SalaDao.update(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public List<Sala> getAll() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        List<Sala> salas = new ArrayList<>();
        try {
            tx.begin();
            Query query = session.createQuery("FROM Sala s JOIN FETCH s.equipamentos").setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
            salas = query.list();
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception SalaDao.getAll(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
        return salas;
    }
    
    @Override
    public Sala getById(Integer id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        Sala sala = new Sala();
        try {
            tx.begin();
            Query query = session
                    .createQuery("FROM Sala WHERE id_sala = :id");
            query.setParameter("id", id);
            sala = (Sala) query.uniqueResult();
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception SalaDao.getById(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
        return sala;
    }

    @Override
    public void remove(Sala s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.delete(s);
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception SalaDao.remove(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }
    
}
