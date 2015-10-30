/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unisal.dao;

import br.unisal.hibernate.util.HibernateUtil;
import br.unisal.interfaces.UsuarioInterface;
import br.unisal.model.Usuario;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author jether
 */
public class UsuarioDao implements UsuarioInterface {

    public UsuarioDao() {
    }
    
    @Override
    public void insert(Usuario s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.save(new Usuario(s));
            tx.commit();
        } catch (HibernateException | NoSuchAlgorithmException e) {
            System.out.println("Exception UsuarioDao.insert(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }
    
    @Override
    public void update(Usuario s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.update(s);
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception UsuarioDao.update(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public List<Usuario> getAll() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        List<Usuario> usuarios = new ArrayList<>();
        try {
            tx.begin();
            Query query = session.createQuery("FROM Usuario");
            usuarios = query.list();
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception UsuarioDao.getAll(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
        return usuarios;
    }
    
    @Override
    public Usuario getById(Integer id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        Usuario usuario = new Usuario();
        try {
            tx.begin();
            Query query = session
                    .createQuery("FROM Usuario WHERE id_usuario = :id");
            query.setParameter("id", id);
            usuario = (Usuario) query.uniqueResult();
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception UsuarioDao.getById(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
        return usuario;
    }

    @Override
    public void remove(Usuario s) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            tx.begin();
            session.delete(s);
            tx.commit();
        } catch (HibernateException e) {
            System.out.println("Exception UsuarioDao.remove(): " + e.getMessage());
            tx.rollback();
        } finally {
            session.close();
        }
    }
    
}
