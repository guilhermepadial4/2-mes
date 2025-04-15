import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FloatingHearts = () => {
  return (
    <div className="floating-hearts">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Heart size={24} color="#4a90e2" fill="#4a90e2" />
        </motion.div>
      ))}
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = new Date(2025, 1, 22, 1, 25); // 22/02/2025 01:20
      const now = new Date();

      if (now < startDate) {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0 });
        return;
      }

      let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

      // Se o dia atual for menor que o dia do início, então o mês não completou ainda
      if (now.getDate() < startDate.getDate()) {
        months -= 1;
      }

      const pastMonthDate = new Date(startDate);
      pastMonthDate.setMonth(startDate.getMonth() + months);

      const diffMs = now.getTime() - pastMonthDate.getTime();

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

      setTimeLeft({ months, days, hours, minutes });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-section">
      <div className="countdown-grid">
        <div className="countdown-item">
          <div className="number">{timeLeft.months}</div>
          <div className="label">Meses</div>
        </div>
        <div className="countdown-item">
          <div className="number">{timeLeft.days}</div>
          <div className="label">Dias</div>
        </div>
        <div className="countdown-item">
          <div className="number">{timeLeft.hours}</div>
          <div className="label">Horas</div>
        </div>
        <div className="countdown-item">
          <div className="number">{timeLeft.minutes}</div>
          <div className="label">Minutos</div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="home-container">
      <FloatingHearts />
      <motion.div className="header" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1>Nosso Amor em Números</h1>
        <p>Cada segundo ao seu lado é precioso</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Countdown />
      </motion.div>

      <motion.div
        className="love-letter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2>Meu Amor,</h2>
        <p>
          Tudo começou de um jeito inesperado. Daqueles que a gente só entende depois, quando olha pra trás. Eu vi você a primeira vez de
          relance na academia, lá em 2023. Só uma vez. Mas bastou.
        </p>
        <p>
          Chamei no Instagram, trocamos algumas palavras... mas eu fui bobo e deixei você no vácuo. Você ainda me cobra isso até hoje (com
          razão). Mas nossas vidas seguiram assim.
        </p>
        <p>
          No Natal de 2024, exatamente no dia 25/12, eu vi um story seu com aquela saia jeans curta que... bom, vamos dizer que chamou minha
          atenção. Mandei aquela porcariazinha "Se é linda assim todos os dias? Ou só em ocasiões especiais como o Natal?". Conversamos um
          pouco, mas aí foi a sua vez de me deixar no vácuo, vingança? Talvez. Mas o universo sabia o que estava fazendo.
        </p>

        <p>
          No dia 06/01/2025, você me respondeu. Eu tinha feito um story especialmente pensando em você. Desde então... nunca mais paramos de
          conversar.
        </p>

        <p>
          Nos vimos pela primeira vez no dia 18/01. Foi ali que percebi, eu ia me apaixonar rapidinho. Começamos a nos ver todos os fins de
          semana, como se o mundo sempre tivesse planejado isso, só esperava o tempo certo.
        </p>

        <p>
          No dia 21/02, levei você pra praia com meus pais. E na madrugada do dia 22, sob aquele céu, o som do mar e a luz da lua, pedi você
          em namoro. Foi mágico. Foi nosso.
        </p>

        <p>
          Desde então, cada dia tem sido o melhor da minha vida. Você é minha morena, meu amor, meu riso fácil, minha paz. Você me
          transformou. Me ensinou sobre amor de verdade, sobre entrega, sobre carinho, e eu sou um homem melhor por sua causa.
        </p>

        <p>Obrigado por ser você morena. Obrigado pela gente, obrigado por me escolher.</p>

        <div className="signature">Com todo meu amor, Seu moreno ❤️</div>
      </motion.div>

      <motion.button className="logout-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={logout}>
        Sair
      </motion.button>
    </div>
  );
};

export default Home;
