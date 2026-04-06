import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check credentials against the requested ones
    if (username === 'walled' && password === '123') {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/')
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>WaSSel</h1>
          <p>أهلاً بك في منصة التربية الإسلامية</p>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">اسم المستخدم</label>
            <input 
              id="username" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="أدخل اسم المستخدم"
              required 
              dir="ltr"
              style={{ textAlign: 'left' }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور" 
              required 
              dir="ltr"
              style={{ textAlign: 'left' }}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="btn-login">تسجيل الدخول</button>
        </form>
      </div>
    </div>
  )
}
