# Visuflux Agent

Un agent de tracking comportemental pour générer des graphiques et heatmaps à partir des interactions utilisateurs.


## 📋 Description

Visuflux Agent est une solution de tracking avancée qui permet de capturer et analyser les comportements des utilisateurs sur vos applications. 
Il génère automatiquement des visualisations sous forme de graphiques et de heatmaps pour vous aider à comprendre l'expérience utilisateur.


## 🚀 Fonctionnalités

- 📊 **Tracking comportemental** - Capture les interactions utilisateurs en temps réel
- 🔥 **Génération de heatmaps** - Visualise les zones d'interaction les plus populaires
- 📈 **Graphiques analytiques** - Produit des graphiques détaillés des comportements
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
│  │  └─ tracking-payload.ts      # Structure des données trackées
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
// Exemple de configuration
{
    apiURL: 'https://visuflux.com',
    endpoint: 'https://api.visuflux.com',
    trackClicks: true,
    trackScroll: true,
    trackMovements: true,
    debug: true
}
```

## 🎯 Utilisation


### Initialisation de base

```typescript
// Exemple d'intégration
<script>
  const agent = new HeatmapAgent({
    apiURL: 'https://visuflux.com',
    endpoint: 'https://api.visuflux.com',
    trackClicks: true,
    trackScroll: true,
    trackMovements: true,
    debug: true
  });

agent.initialize();
</script>
```


### Types d'actions trackées

L'agent peut capturer différents types d'interactions définies dans `ActionTypes` :

- [x] Clics
- [x] Mouvements de souris
- [x] Scrolling
- [ ] Interactions tactiles (mobile)
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
