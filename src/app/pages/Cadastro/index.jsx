import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthProvider';
import styles from './Cadastro.module.css';

export default function Cadastro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      toast.error('As senhas não coincidem.');
      return;
    }
    setSubmitting(true);
    try {
      await register({ name, email, password });
      toast.success('Conta criada com sucesso!');
      navigate('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Não foi possível criar a conta.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <span className={styles.logoIconText}>EL</span>
          </div>
          <span className={styles.logoText}>EduLearn</span>
        </div>

        <h1 className={styles.title}>Criar sua conta</h1>
        <p className={styles.subtitle}>Cadastre-se para começar a aprender</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.field}>
            <span className={styles.label}>Nome completo</span>
            <div className={styles.inputWrap}>
              <User className={styles.inputIcon} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
                className={styles.input}
              />
            </div>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <div className={styles.inputWrap}>
              <Mail className={styles.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                required
                className={styles.input}
              />
            </div>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Senha</span>
            <div className={styles.inputWrap}>
              <Lock className={styles.inputIcon} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                className={styles.input}
              />
            </div>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Confirmar senha</span>
            <div className={styles.inputWrap}>
              <Lock className={styles.inputIcon} />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repita a senha"
                required
                className={styles.input}
              />
            </div>
          </label>

          <button type="submit" disabled={submitting} className={styles.submit}>
            {submitting ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        <p className={styles.foot}>
          Já tem conta?{' '}
          <Link to="/login" className={styles.footLink}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}
