const prodotti = [
  { imgSrc: 'Prodotto1.jpg', hoverSrc: 'prodotto5.jpg', titolo: 'SWEATERS', descrizione: 'Questi capi presentano vita media, vestibilità dritta, lunghezza regolare e fascia in vita, realizzato al 100% in lino.', prezzo: { minimo: 50, massimo: 80 }},
  { imgSrc: 'Prodotto2.jpg', hoverSrc: 'prodotto6.jpg', titolo: 'DENIM', descrizione: 'Abbiamo combinato il nostro tessuto di lino morbido e traspirante con l amata forma di ispirazione artigianale dei nostri Utility Barrel Pant.', prezzo: { minimo: 10, massimo: 70 }},
  { imgSrc: 'Prodotto3.jpg', hoverSrc: 'prodotto7.jpg', titolo: 'TOP', descrizione: 'Realizzata nel nostro tessuto preferito per la stagione calda, la canotta in lino con scollo rotondo presenta un doppio scollo rotondo con una vestibilità comoda.', prezzo: { minimo: 5, massimo: 20 }},
  { imgSrc: 'Prodotto4.jpg', hoverSrc: 'prodotto8.jpg', titolo: 'BOTTOM', descrizione: 'Questo capo è caratterizzato da vita alta, gamba a botte, lunghezza regolare, in cotone organico.', prezzo: { minimo: 15, massimo: 30 }}
];

async function convertiPrezziUSD() {
  const exchangeRate = await getExchangeRate();
  if (exchangeRate) {
    const prezzoContainers = document.querySelectorAll('.prodotto-prezzo');

    prezzoContainers.forEach(prezzoContainer => {
      const prezzoEURText = prezzoContainer.querySelector('.prezzo-eur').textContent;
      const prezzoEUR = parsePrezzo(prezzoEURText);

      if (prezzoEUR) {
        const prezzoMinUSD = prezzoEUR.minimo * exchangeRate;
        const prezzoMaxUSD = prezzoEUR.massimo * exchangeRate;

        const prezzoUSDText = `$${prezzoMinUSD.toFixed(2)} - $${prezzoMaxUSD.toFixed(2)}`;
        prezzoContainer.querySelector('.prezzo-usd').textContent = prezzoUSDText;
      } else {
        prezzoContainer.querySelector('.prezzo-usd').textContent = 'Prezzo non disponibile';
      }
    });
  }
}

async function getExchangeRate() {
  const apiKey = '542fdb6512340bbc3d240494';
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === 'success') {
      return data.conversion_rates.USD;
    } else {
      console.error('Errore durante il recupero del tasso di cambio:', data['error-type']);
      return null;
    }
  } catch (error) {
    console.error('Si è verificato un errore durante la richiesta del tasso di cambio:', error);
    return null;
  }
}

function parsePrezzo(prezzoText) {
  const match = prezzoText.match(/€(\d+(\.\d+)?) - €(\d+(\.\d+)?)/);
  if (match) {
    return {
      minimo: parseFloat(match[1]),
      massimo: parseFloat(match[3])
    };
  }
  return null;
}

const listaProdotti = document.getElementById('listaProdotti');
prodotti.forEach(prodotto => {
  const nuovoElemento = document.createElement('li');
  const imgElement = document.createElement('img');
  imgElement.src = prodotto.imgSrc;
  imgElement.setAttribute('data-hover-src', prodotto.hoverSrc);
  nuovoElemento.appendChild(imgElement);

  const titoloContainer = document.createElement('div');
  const titolo = document.createElement('h3');
  titolo.textContent = prodotto.titolo;
  titoloContainer.appendChild(titolo);

  const prezzoContainer = document.createElement('div');
  const prezzoEUR = prodotto.prezzo;
  const prezzoEURText = `€${prezzoEUR.minimo} - €${prezzoEUR.massimo}`;
  const prezzoEURSpan = document.createElement('span');
  prezzoEURSpan.textContent = prezzoEURText;
  prezzoEURSpan.classList.add('prezzo-eur');
  prezzoContainer.appendChild(prezzoEURSpan);

  const prezzoUSDContainer = document.createElement('span');
  prezzoUSDContainer.classList.add('prezzo-usd');
  prezzoContainer.appendChild(prezzoUSDContainer);

  prezzoContainer.classList.add('prodotto-prezzo');
  titoloContainer.appendChild(prezzoContainer);

  nuovoElemento.appendChild(titoloContainer);

  const descrizione = document.createElement('p');
  descrizione.textContent = prodotto.descrizione;
  descrizione.classList.add('descrizione');
  nuovoElemento.appendChild(descrizione);

  const tasto = document.createElement('a');
  tasto.textContent = 'Show More';
  tasto.classList.add('tasto');
  nuovoElemento.appendChild(tasto);

  tasto.addEventListener('click', (event) => {
      event.stopPropagation();
      const testoVisibile = descrizione.style.display !== 'none';
      if (testoVisibile) {
          descrizione.style.display = 'none';
          tasto.textContent = 'Show More';
      } else {
          descrizione.style.display = 'block';
          tasto.textContent = 'Show Less';
      }
  });

  imgElement.addEventListener('mouseover', () => {
      imgElement.src = imgElement.getAttribute('data-hover-src');
  });

  imgElement.addEventListener('mouseout', () => {
      imgElement.src = prodotto.imgSrc;
  });

  listaProdotti.appendChild(nuovoElemento);
});

const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', convertiPrezziUSD);

async function inviaMessaggioAlChatbot(messaggio) {
  const credenziali = {
      type: "service_account",
      project_id: "rosy-ratio-422415-m8",
      private_key_id: "c4fbd53dceb7296d6f80c3784a737a3fc662d1cd",
      private_key: "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCq0/MS18pokYKx\nO2VpF3EVCd1q3eF8N5hQPCjuojJiZWOy2aye+Rcdw7mwvyqEeOfmyv29uJFoM7y4\nR1dy/dymRn/7KPl8tw4gaq7UB6kDsEgjYFmffLC1Inz1YerBVsszhZKIvq/7JYKp\n6tMKHY6X/xmfD0E0l9eVLdqr5ppSLhrdz0UerpoqYJV4AMhSO21bkQSzX62iPGys\nxmJqFSdLxO+Q0VF1fGLvwxmRdEZdxjQMrPCOR6u0MJiu/vBPOl/OicOn3clPrQ0I\nsIRgx4UIxH1UwEYrC2iqsrJLspS5axHhtNgTijT/8Q80ZfGbAgO+naB6GecloN1t\nP8hs6MHRAgMBAAECggEAF1wcDrUUgtUhvoj6lp2JLfvR2+Boilsd3cbu6qb3uy3V\n2CoHqXDdgN6iwLEmKBmnzeRvQKeBtsfwZBtZXCpWfHmtMZQKUyFtx0VfZTOA9gtV\nP1qDFu9ESMNlEWG+P4mrXX8ZU9AOR4p7F4Tlg/9uYDRBoCxurw7z1idVkjvartGm\nmeDLNGmAA8w3Nd9UY3KID3bGErfkmyUJrGvnbamRSVQS9tVckJFpvXFUHMr/FKu6\n9ARnY5VIAzba2Fd1Hlxg9IKgTkwfbULI9e1EKGxzHWRnP0TuMzNBTyszlMleXgQF\nu7RwUhpiC2BTgrxf4seDcKT1fYUkbvd+PObwYNdAAwKBgQDrAVLT/2/EY0NslYEc\nKCjpYjfjpP++E6loWCH4SapRRnQ8xeJE2xTJle3koB9HJkEy+QADEU0NiFrLUqCX\nYf32sQBO4FC7Qc7DSQ186rAPCZpghwFlFD/+hPA8X3wYj9SL8QM3SINGXandn2XO\nuACZSah3aYtaRuHCX5J8WwBjLwKBgQC6FtzlXlryGMktOWYah3IsAt2AQE24gB2x\nmKoJaAuvfleR0P6ieXgdjAomy2TQ/PwLAEdexSjKmHlPVVegRkGFA0mgej2DK+/j\nPpSf+h+bFFJRwS0r/mkO7OxeZP/DY6fLI3u6l2OTXnUjz8hCLkJ6Kw5+hiN1j+5w\nEU3yXbPq/wKBgAHNvcwAvuPb+y1/LEGCEWZRKaqmnovf7MHvQzt7nUIIb2X0AtuS\nbuNpMi06CWNraL6yaIydemDrNf8vgCoJR4C4NQ9l61i0lZisG91kk7tZ0ISDJMCY\n2jDi5lEgTnyFxhTY4bRv6woEOASKb6aZhO+oQBHCjp4/wwXR4/buX99jAoGAJh3o\nwVLCbjSFgK3xLB3yVPGBTXPed5xGeMo8ihC11AydA1E71yvqXqMAsVGYJPas6dP0\nyoS4BkeVEZr5h+rcINK7khN35hZp3LJE3z/smWdgNT7MceZ6voPpJqypduxCwmlS\nPrYjv1vpwpwc+PFgzIVlQqVXPg1tWacxwCNRZyECgYEAjS/lkRf5YZp7e/es7ng/\nWwyuxarZisS56guxxA0Teu175UlgUYaSlwuZ/rzq3696Eh9mvI/btkpG+2kGVDFJ\nKwO/h7WnKlnPzy2Epf2FAoFqh4ldDqGjLDIgzbe5/7vbNpfDvbcngB63UaCBeN2z\nhJ78A6VgwkZ++FBY08aXSxw=",
      client_email: "francescovitali@rosy-ratio-422415-m8.iam.gserviceaccount.com",
      client_id: "116447456812103611509",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/francescovitali%40rosy-ratio-422415-m8.iam.gserviceaccount.com",
      universe_domain: "googleapis.com"
  };

  const { project_id, private_key, client_email } = credenziali;
  const sessionId = Math.random().toString(36).substring(7);

  const url = `https://dialogflow.googleapis.com/v2/projects/${project_id}/agent/sessions/${sessionId}:detectIntent`;

  const requestData = {
      queryInput: {
          text: {
              text: messaggio,
              languageCode: 'en-US',
          },
      },
  };

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${private_key}`,
          },
          body: JSON.stringify(requestData),
      });

      if (!response.ok) {
          throw new Error(`Errore HTTP! Stato: ${response.status}`);
      }

      const data = await response.json();

      const fulfillmentText = data.queryResult.fulfillmentText;
      console.log('Risposta del chatbot:', fulfillmentText);

      return fulfillmentText;
  } catch (error) {
      console.error('Errore durante la comunicazione con il chatbot:', error);
      return 'Errore durante la comunicazione con il chatbot.';
  }
}

async function inviaMessaggioUtente() {
    const userInput = document.getElementById('userInput').value;
    const chatContainer = document.getElementById('chatContainer');

    const userMessageElement = document.createElement('p');
    userMessageElement.textContent = `User: ${userInput}`;
    chatContainer.appendChild(userMessageElement);

    try {
        const response = await inviaMessaggioAlChatbot(userInput);

        const botMessageElement = document.createElement('p');
        botMessageElement.textContent = `Chatbot: ${response}`;
        chatContainer.appendChild(botMessageElement);

    } catch (error) {
        console.error('Errore durante l\'invio del messaggio al chatbot:', error);
        const errorMessageElement = document.createElement('p');
        errorMessageElement.textContent = `Errore durante l'invio del messaggio al chatbot`;
        chatContainer.appendChild(errorMessageElement);
    }

    document.getElementById('userInput').value = '';
}

document.getElementById('openChatbotButton').addEventListener('click', apriChatbot);
document.getElementById('closeChatbotButton').addEventListener('click', chiudiChatbot);
document.getElementById('sendMessageButton').addEventListener('click', inviaMessaggioUtente);