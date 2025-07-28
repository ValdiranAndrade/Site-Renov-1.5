# 📱 Guia de Acesso à Versão Mobile - Renov

## 🚀 Como Acessar a Versão Mobile

### **Opção 1: Acesso Automático (Recomendado)**
A versão mobile é carregada automaticamente quando você acessa o site em um dispositivo móvel.

**URL Principal:**
```
https://valdiranandrade.github.io/Site-Renov-1.5/
```

### **Opção 2: Acesso Manual**
Para acessar diretamente a versão mobile:

**URL Mobile:**
```
https://valdiranandrade.github.io/Site-Renov-1.5/mobile/
```

### **Opção 3: Banner de Troca**
Quando você acessa o site, aparecerá um banner no topo permitindo trocar entre as versões:
- **"Trocar versão"** - Muda entre mobile e desktop
- **"×"** - Fecha o banner

## 🔧 Configuração do GitHub Pages

### **1. Verificar Configurações**
- Acesse: `https://github.com/ValdiranAndrade/Site-Renov-1.5/settings/pages`
- Certifique-se que **Source** está configurado como **"Deploy from a branch"**
- **Branch** deve ser **"main"** ou **"gh-pages"**
- **Folder** deve ser **"/ (root)"**

### **2. Habilitar GitHub Pages**
Se não estiver habilitado:
1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione **"Deploy from a branch"**
3. Selecione **"main"** como branch
4. Clique **Save**

### **3. Verificar Deploy**
- Aguarde alguns minutos para o deploy
- Verifique se aparece: **"Your site is published at https://valdiranandrade.github.io/Site-Renov-1.5/"**

## 📱 Testando a Versão Mobile

### **No Desktop (Simular Mobile)**
1. Abra o DevTools (F12)
2. Clique no ícone de dispositivo móvel
3. Selecione um dispositivo (ex: iPhone 12)
4. Acesse: `https://valdiranandrade.github.io/Site-Renov-1.5/`

### **No Dispositivo Real**
1. Abra o navegador no seu smartphone
2. Acesse: `https://valdiranandrade.github.io/Site-Renov-1.5/`
3. A versão mobile deve carregar automaticamente

## 🛠️ Solução de Problemas

### **Erro 404**
Se você receber erro 404:

1. **Verificar URL correta:**
   ```
   https://valdiranandrade.github.io/Site-Renov-1.5/
   ```

2. **Verificar se o GitHub Pages está ativo:**
   - Vá em Settings → Pages
   - Deve aparecer: "Your site is published at..."

3. **Aguardar deploy:**
   - Pode levar até 10 minutos após push

### **Versão Mobile Não Carrega**
1. **Limpar cache do navegador**
2. **Verificar se o JavaScript está habilitado**
3. **Testar em modo incógnito**

### **Banner Não Aparece**
1. **Verificar se o script está carregado:**
   ```javascript
   // No console do navegador
   console.log('Mobile redirect script loaded');
   ```

2. **Verificar cookies:**
   ```javascript
   // No console
   document.cookie
   ```

## 📊 Estrutura de Arquivos

```
Site-Renov-1.5/
├── index.html              # Versão desktop
├── mobile/
│   └── index.html          # Versão mobile
├── mobile-redirect.js      # Script de redirecionamento
├── mobile-detector.js      # Detector de dispositivos
├── mobile-optimizer.js     # Otimizações mobile
├── mobile-optimizations.css # CSS mobile
└── .htaccess              # Configuração servidor (não funciona no GitHub Pages)
```

## 🎯 URLs Importantes

| Tipo | URL |
|------|-----|
| **Desktop** | `https://valdiranandrade.github.io/Site-Renov-1.5/` |
| **Mobile** | `https://valdiranandrade.github.io/Site-Renov-1.5/mobile/` |
| **GitHub** | `https://github.com/ValdiranAndrade/Site-Renov-1.5` |

## 📱 Funcionalidades Mobile

### **Otimizações Implementadas**
- ✅ Layout mobile-first
- ✅ Menu hamburger nativo
- ✅ Touch targets de 44px
- ✅ CSS crítico inline
- ✅ JavaScript otimizado
- ✅ Detecção automática
- ✅ Banner de troca de versão

### **Performance**
- **LCP**: ~1.2s (mobile)
- **FID**: ~45ms (mobile)
- **CLS**: ~0.03 (mobile)
- **Tamanho**: 28KB (mobile)

## 🔄 Atualizações

Para atualizar o site:
```bash
git add .
git commit -m "Atualização do site"
git push origin main
```

O GitHub Pages fará o deploy automaticamente em alguns minutos.

---

**📞 Suporte:** Se ainda tiver problemas, verifique:
1. URL correta do repositório
2. Configuração do GitHub Pages
3. Cache do navegador
4. JavaScript habilitado 