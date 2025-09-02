# Visuflux Agent

Un agent de tracking comportemental pour générer des graphiques et heatmaps à partir des interactions utilisateurs.


## 📋 Description

Visuflux Agent est une solution de tracking avancée qui permet de capturer et les comportements des utilisateurs sur vos applications pour vous aider à comprendre l'expérience utilisateur. 


## 🚀 Fonctionnalités

- 📊 **Tracking comportemental** - Capture les interactions utilisateurs en temps réel
- 📱 **Support mobile** - Optimisé pour les appareils mobiles
- 🎯 **Configuration flexible** - Agent configurable selon vos besoins


## 📁 Structure du projet

```
📦 visuflux-agent
├─ .gitignore
├─ .prettierrc
├─ package.json
├─ src
│  ├─ agent.ts                    # Agent principal de tracking
│  ├─ enums
│  │  └─ action-types.ts          # Types d'actions trackées
│  ├─ interfaces
│  │  ├─ agent-config.ts          # Configuration de l'agent
│  │  └─ tracking-payload-buffer.ts      # Structure des données trackées
│  ├─ listeners
│  │  └─ tracking-listeners.ts    # Écouteurs d'événements
│  ├─ models
│  │  └─ coordinates.ts           # Modèle de coordonnées
│  └─ utils
│     └─ mobile-utils.ts          # Utilitaires pour mobile
└─ tsconfig.json
```

## 🛠️ Installation


Pas encore dispo sur NPM.

## ⚙️ Configuration


L'agent se configure via l'interface `AgentConfig` :

```typescript
// Exemple de configuration de l'agent 
{
  apiURL: "http://localhost:8080",
  trackClicksOptions: { enabled: true, throttleMs: 100 },
  trackScrollOptions: { enabled: true, throttleMs: 100 },
  trackMovementsOptions: { enabled: true, throttleMs: 250 },
  debug: true
};
```

## 🎯 Utilisation


### Initialisation de base

```typescript
// Exemple d'intégration
<html>
  <script src="dist/visuflux-agent.js"/>
  <body>
      <script>
        //build the agent configuration
        const config = {
          apiURL: "http://localhost:8080",
          trackClicksOptions: { enabled: true, throttleMs: 100 },
          trackScrollOptions: { enabled: true, throttleMs: 100 },
          trackMovementsOptions: { enabled: true, throttleMs: 250 },
          debug: true
        };

        //Instantiate the agent
        const agent = new VisuFluxAgent(config);
        agent.initialize(); // Start tracking
        agent.uninitialize(); // Stop tracking
      </script>
    </body>
</html>
```


### Types d'actions trackées

L'agent peut capturer différents types d'interactions définies dans `ActionTypes` :

- [x] Clics
- [x] Mouvements de souris
- [x] Scrolling
- [x] Interactions tactiles (mobile)
- [ ] Et bien d'autres...


## 📱 Support Mobile

Le projet inclut des utilitaires spécialisés pour le tracking mobile, permettant une expérience optimale sur tous les appareils.


## 📊 Données collectées

L'agent collecte des données structurées via `TrackingPayload` incluant :

- Coordonnées des interactions
- Types d'actions
- Métadonnées contextuelles
- Informations sur l'appareil


## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Ouvrir une Pull Request


## 📄 Licence

Ce projet est sous licence [MIT](https://github.com/VisuFlux/web-agent/blob/master/LICENSE).


## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur le repository.

---

**Visuflux Agent** - Transformez les interactions utilisateurs en insights visuels puissants.
