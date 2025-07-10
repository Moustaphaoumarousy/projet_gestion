// Mise à jour des données pour le Sénégal
        let appData = {
            clients: [],
            products: [],
            invoices: [],
            settings: {
                company: {
                    name: "Votre Entreprise",
                    siret: "", // Au Sénégal, on utilise plutôt le NINEA (Numéro d'Identification Nationale des Entreprises et Associations)
                    address: "Dakar, Sénégal",
                    zip: "",
                    city: "Dakar",
                    phone: "+221 77 123 45 67",
                    email: "contact@votreentreprise.sn",
                    website: "www.votreentreprise.sn",
                    logo: ""
                },
                invoice: {
                    prefix: "FAC", // Facture
                    nextNumber: 1,
                    dueDays: 30,
                    defaultCurrency: "XOF", // Franc CFA (XOF) comme devise par défaut
                    footerNotes: "Paiement par virement bancaire, mobile money ou espèce.",
                    defaultTerms: "Paiement sous 30 jours fin de mois."
                },
                taxes: [
                    { name: "Exonéré", rate: 0, default: false },
                    { name: "TVA 18%", rate: 18, default: true }, // TVA standard au Sénégal
                    { name: "TVA 10%", rate: 10, default: false }, // Pour certains produits de première nécessité
                    { name: "TVA 5%", rate: 5, default: false } // Pour les produits agricoles
                ]
            },
            currentInvoice: {
                items: [],
                clientId: null,
                date: new Date().toISOString().split('T')[0],
                dueDate: "",
                currency: "XOF", // Franc CFA par défaut
                notes: "",
                terms: "",
                discount: 0,
                status: "pending"
            }
        };

        // Mise à jour des données exemple pour le Sénégal
        function loadData() {
            const savedData = localStorage.getItem('easyFactureData');
            if (savedData) {
                appData = JSON.parse(savedData);
            } else {
                // Clients exemple avec des noms sénégalais
                appData.clients = [
                    {
                        id: 1,
                        firstName: "Mamadou",
                        lastName: "Diop",
                        company: "Boulangerie Diop",
                        email: "mamadou@boulangeriediop.sn",
                        phone: "+221 77 234 56 78",
                        address: "Rue 10, Point E",
                        zip: "",
                        city: "Dakar",
                        country: "Sénégal",
                        siret: "SN00123456789", // NINEA
                        createdAt: "2023-01-15"
                    },
                    {
                        id: 2,
                        firstName: "Aminata",
                        lastName: "Ndiaye",
                        company: "Café Touba Ndiaye",
                        email: "aminata@cafetouba.sn",
                        phone: "+221 76 123 45 67",
                        address: "Avenue Blaise Diagne",
                        zip: "",
                        city: "Thiès",
                        country: "Sénégal",
                        siret: "SN00987654321",
                        createdAt: "2023-02-20"
                    }
                ];
                
                // Produits adaptés au marché sénégalais
                appData.products = [
                    {
                        id: 1,
                        name: "Pain (lot de 50)",
                        reference: "PROD-001",
                        category: "Boulangerie",
                        price: 5000, // En XOF (5000 FCFA)
                        taxId: 1, // TVA 18%
                        stock: 15,
                        description: "Lot de 50 pains",
                        createdAt: "2023-01-10"
                    },
                    {
                        id: 2,
                        name: "Café Touba (kg)",
                        reference: "PROD-002",
                        category: "Epicerie",
                        price: 3000, // 3000 FCFA
                        taxId: 2, // TVA 10%
                        stock: 22,
                        description: "Café Touba en grains 1kg",
                        createdAt: "2023-01-10"
                    }
                ];
                
                // Factures exemple
                appData.invoices = [
                    {
                        id: 1,
                        number: "FAC-2023-001",
                        clientId: 1,
                        date: "2023-06-15",
                        dueDate: "2023-06-30",
                        items: [
                            { productId: 1, quantity: 2, price: 5000, taxId: 1 }
                        ],
                        currency: "XOF",
                        notes: "Livraison prévue le 16/06/2023",
                        terms: "Paiement par Orange Money accepté",
                        discount: 0,
                        status: "paid",
                        createdAt: "2023-06-15"
                    }
                ];
                
                saveData();
            }
        }

        // Mise à jour de la fonction de formatage de la devise pour le XOF
        function formatCurrency(amount, currency = 'XOF') {
            if (currency === 'XOF') {
                return new Intl.NumberFormat('fr-FR', { 
                    style: 'currency', 
                    currency: 'XOF',
                    currencyDisplay: 'code'
                }).format(amount).replace('XOF', 'FCFA');
            }
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(amount);
        }

        // Mise à jour des options de devise dans le HTML
        // Dans la section "Nouvelle Facture", remplacer les options de devise par :
        /*
        <select class="form-select" id="invoiceCurrency">
            <option value="XOF" selected>XOF (FCFA)</option>
            <option value="EUR">EUR €</option>
            <option value="USD">USD $</option>
        </select>
        */

        // Dans les paramètres de facturation, mettre à jour les options de devise :
        /*
        <select class="form-select" id="invoiceDefaultCurrency" required>
            <option value="XOF" selected>XOF (FCFA)</option>
            <option value="EUR">EUR €</option>
            <option value="USD">USD $</option>
        </select>
        */

        // Ajouter un champ NINEA dans le formulaire client
        // Remplacer le champ SIRET par :
        /*
        <div class="col-md-6">
            <div class="mb-3">
                <label class="form-label">NINEA</label>
                <input type="text" class="form-control" id="clientNinea">
            </div>
        </div>
        */

        // Mettre à jour les termes de paiement par défaut pour inclure les options locales
        /*
        <textarea class="form-control" rows="3" id="invoiceDefaultTerms">Paiement par virement bancaire, mobile money (Orange Money, Wave, etc.) ou espèce.</textarea>
        */