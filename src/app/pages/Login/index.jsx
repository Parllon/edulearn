import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthProvider';
import styles from './Login.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });
      toast.success('Bem-vindo de volta!');
      navigate('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Não foi possível entrar.');
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

        <h1 className={styles.title}>Entrar na sua conta</h1>
        <p className={styles.subtitle}>Acesse seus cursos e continue aprendendo</p>

        <form onSubmit={handleSubmit} className={styles.form}>
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
                placeholder="••••••••"
                required
                className={styles.input}
              />
            </div>
          </label>

          <button type="submit" disabled={submitting} className={styles.submit}>
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className={styles.foot}>
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className={styles.footLink}>Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
