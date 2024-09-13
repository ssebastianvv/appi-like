"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/register.module.css';
import { registerUser } from '../controller/register.controller'; // Importar el controlador

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { user, message } = await registerUser(name, email, password);

    if (user) {
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => router.push('/login'), 3000); // Espera antes de redirigir
    } else {
      setError(message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <div className={styles.container}>
      <div>
        <label htmlFor="name" className={styles.label}>Name:</label>
        <input
        className={styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
        className={styles.input}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="password" className={styles.label}>Password:</label>
        <input
        className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <button type="submit" className={styles.button}>Register</button>
      
    </form>
  );
};

export default RegisterForm;
