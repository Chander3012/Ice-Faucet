import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
// import yourLogo from "../../assets/1.png"; 
import { FaBolt, FaGift, FaUsers, FaWallet } from "react-icons/fa";
import styles from "./style.module.css";

const Landing = () => {
  const [activeUsers, setActiveUsers] = useState(34);
  const [registeredUsers, setRegisteredUsers] = useState(450);
  const [totalPayout, setTotalPayout] = useState(120);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const activeUserInterval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 2));
    }, 30000);

    const registeredUserInterval = setInterval(() => {
      setRegisteredUsers((prev) => prev + Math.floor(Math.random() * 3));
    }, 30000);

    const payoutInterval = setInterval(() => {
      setTotalPayout((prev) => prev + Math.floor(Math.random() * 1) + 1);
    }, 40000);

    return () => {
      clearInterval(activeUserInterval);
      clearInterval(registeredUserInterval);
      clearInterval(payoutInterval);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <FaBolt size={32} />,
      title: "Instant Claims",
      description: "Receive your crypto rewards instantly, without delays or hassles.",
    },
    {
      icon: <FaGift size={32} />,
      title: "Daily Bonuses",
      description: "Get rewarded every day you log in with exclusive bonuses.",
    },
    {
      icon: <FaUsers size={32} />,
      title: "Referral System",
      description: "Earn even more by inviting your friends to join the faucet.",
    },
    {
      icon: <FaWallet size={32} />,
      title: "Secure Wallet Integration",
      description: "Connect securely to your crypto wallet for seamless withdrawals.",
    },
  ];

  const faqData = [
    {
      question: "What is Ice Faucet?",
      answer: "Ice Faucet is a crypto reward platform that lets users claim free tokens by completing simple tasks or actions.",
    },
    {
      question: "How do I start earning?",
      answer: "Simply sign up, complete the given tasks, and you'll start earning crypto instantly.",
    },
    {
      question: "Is there any withdrawal limit?",
      answer: "Yes, there's a minimum withdrawal limit set to ensure fair usage and prevent spam.",
    },
    {
      question: "How often can I claim rewards?",
      answer: "You can claim rewards every 24 hours or based on specific cooldowns for tasks.",
    },
    {
      question: "Which cryptocurrencies are supported?",
      answer: "We support Ethereum, USDT, and Ice Token, with more being added soon!",
    },
  ];

  const steps = [
    {
      title: "Step 1: Register",
      description: "Sign up easily using your crypto wallet or email.",
      align: "left",
    },
    {
      title: "Step 2: Verify Account",
      description: "Complete a quick verification to secure your profile.",
      align: "right",
    },
    {
      title: "Step 3: Complete Tasks",
      description: "Engage with simple daily actions or social tasks.",
      align: "left",
    },
    {
      title: "Step 4: Earn ICE Coins",
      description: "Receive ICE coins immediately after completing tasks.",
      align: "right",
    },
    {
      title: "Step 5: Track Rewards",
      description: "View your balance, stats, and referral earnings in your dashboard.",
      align: "left",
    },
    {
      title: "Step 6: Withdraw Crypto",
      description: "Convert your ICE coins into your favorite crypto like ETH, BNB, or USDT.",
      align: "right",
    },
  ];

  return (
    <div className={styles.container}>
      <Navbar />

      {/* Hero Section */}
      <section className={`${styles.hero} ${isMobile ? styles.mobileHero : ''}`}>
      <motion.div
        className={styles.heroContent}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.heroTitle}>Claim Free Crypto Instantly</h1>
        <p className={styles.heroDescription}>
          Earn crypto rewards with ease. Join our faucet system and start collecting tokens right now!
        </p>

        {/* Coin Images Row */}
        <div className={styles.coinRow}>
          <img src="/coins-imges/bitcoin.webp" alt="Bitcoin" className={styles.coinIcon} />
          <img src="/coins-imges/ethereum.webp" alt="Ethereum" className={styles.coinIcon} />
          <img src="/coins-imges/litecoin.webp" alt="Litecoin" className={styles.coinIcon} />
          <img src="/coins-imges/dogecoin.webp" alt="Dogecoin" className={styles.coinIcon} />
          <img src="/coins-imges/tron-logo.webp" alt="Tron" className={styles.coinIcon} />
        </div>

        <Link to="../Register">
          <button className={styles.heroButton}>Get Started</button>
        </Link>
      </motion.div>
    </section>

      {/* Stats Section */}
      <motion.section
      id="About"
        className={styles.stats}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
      >
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}>{activeUsers}+</h3>
          <p>Active Users</p>
        </div>
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}>{registeredUsers}+</h3>
          <p>Registered Users</p>
        </div>
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}>${totalPayout}+</h3>
          <p>Total Payouts</p>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        className={styles.howItWorks}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>How It Works</h2>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`${styles.step} ${step.align === "left" ? styles.stepLeft : styles.stepRight}`}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: step.align === "left" ? -50 : 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.stepNumber}>
                {index + 1}
              </div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="choose"
        className={styles.features}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>Why Choose Ice Faucet?</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className={styles.faq}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>

        {faqData.map((faq, index) => (
          <div
            key={index}
            className={styles.faqItem}
            onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
          >
            <h3>{faq.question}</h3>
            {openFAQIndex === index && <p>{faq.answer}</p>}
          </div>
        ))}
      </motion.section>

      <Footer />
    </div>
  );
};

export default Landing;