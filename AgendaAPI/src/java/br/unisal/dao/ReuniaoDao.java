/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.dao;

import br.unisal.hibernate.util.HibernateUtil;
import br.unisal.interfaces.ReuniaoInterface;
import br.unisal.model.Reuniao;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class ReuniaoDao implements ReuniaoInterface {

    public ReuniaoDao() {
    }
    
    @Override
    public void insert(Reuniao r) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.save(new Reuniao(r));
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception ReuniaoDao.insert(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }
    
    @Override
    public void update(Reuniao r) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.update(r);
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception ReuniaoDao.update(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public List<Reuniao> getAll() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        List<Reuniao> reunioes = new ArrayList<>();
        try {
            tx.begin();
            Query query = session.createQuery("FROM Reuniao r JOIN FETCH r.participantes").setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
            reunioes = query.list();
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception ReuniaoDao.getAll(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
        return reunioes;
    }
    
    @Override
    public Reuniao getById(Integer id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        Reuniao reuniao = new Reuniao();
        try {
            tx.begin();
            Query query = session
                    .createQuery("FROM Reuniao WHERE id_reuniao = :id");
            query.setParameter("id", id);
            reuniao = (Reuniao) query.uniqueResult();
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception ReuniaoDao.getById(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
        return reuniao;
    }

    @Override
    public void remove(Reuniao r) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.delete(r);
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception ReuniaoDao.remove(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }
    
}
