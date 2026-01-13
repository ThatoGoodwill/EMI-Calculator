     // JavaScript remains exactly the same
        const principalInput = document.getElementById('principal');
        const principalSlider = document.getElementById('principal-slider');
        const principalValue = document.getElementById('principal-value');
        
        const interestInput = document.getElementById('interest');
        const interestSlider = document.getElementById('interest-slider');
        const interestValue = document.getElementById('interest-value');
        
        const tenureInput = document.getElementById('tenure');
        const tenureSlider = document.getElementById('tenure-slider');
        const tenureValue = document.getElementById('tenure-value');
        const tenureButtons = document.querySelectorAll('.tenure-btn');
        
        const calculateBtn = document.getElementById('calculate');
        const testButtons = document.querySelectorAll('.test-btn');
        
        const resultSection = document.getElementById('resultSection');
        const emiResult = document.getElementById('emi-result');
        const totalInterest = document.getElementById('total-interest');
        const totalPayment = document.getElementById('total-payment');
        
        function formatCurrency(amount) {
            return 'R ' + new Intl.NumberFormat('en-ZA', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }
        
        function initCalculator() {
            updatePrincipalDisplay();
            updateInterestDisplay();
            updateTenureDisplay();
            
            setupInputSync();
            
            tenureButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const years = this.getAttribute('data-years');
                    tenureInput.value = years;
                    tenureSlider.value = years;
                    updateTenureDisplay();
                    
                    tenureButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            testButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const principal = this.getAttribute('data-principal');
                    const interest = this.getAttribute('data-interest');
                    const tenure = this.getAttribute('data-tenure');
                    
                    principalInput.value = principal;
                    principalSlider.value = principal;
                    updatePrincipalDisplay();
                    
                    interestInput.value = interest;
                    interestSlider.value = interest;
                    updateInterestDisplay();
                    
                    tenureInput.value = tenure;
                    tenureSlider.value = tenure;
                    updateTenureDisplay();
                    
                    tenureButtons.forEach(btn => {
                        if (btn.getAttribute('data-years') === tenure) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                    
                    calculateEMI();
                });
            });
            
            calculateBtn.addEventListener('click', function() {
                calculateEMI();
                resultSection.classList.add('show');
                setTimeout(() => {
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            });
        }
        
        function setupInputSync() {
            principalInput.addEventListener('input', function() {
                const value = parseFloat(this.value) || 0;
                principalSlider.value = value;
                updatePrincipalDisplay();
            });
            
            principalSlider.addEventListener('input', function() {
                const value = parseFloat(this.value);
                principalInput.value = value;
                updatePrincipalDisplay();
            });
            
            interestInput.addEventListener('input', function() {
                const value = parseFloat(this.value) || 0;
                interestSlider.value = value;
                updateInterestDisplay();
            });
            
            interestSlider.addEventListener('input', function() {
                const value = parseFloat(this.value);
                interestInput.value = value;
                updateInterestDisplay();
            });
            
            tenureInput.addEventListener('input', function() {
                const value = parseFloat(this.value) || 0;
                tenureSlider.value = value;
                updateTenureDisplay();
            });
            
            tenureSlider.addEventListener('input', function() {
                const value = parseFloat(this.value);
                tenureInput.value = value;
                updateTenureDisplay();
            });
        }
        
        function updatePrincipalDisplay() {
            const value = parseFloat(principalInput.value) || 0;
            principalValue.textContent = formatCurrency(value);
        }
        
        function updateInterestDisplay() {
            const value = parseFloat(interestInput.value) || 0;
            interestValue.textContent = `${value}%`;
        }
        
        function updateTenureDisplay() {
            const years = parseFloat(tenureInput.value) || 0;
            const months = years * 12;
            tenureValue.textContent = `${years} Years (${months} Months)`;
        }
        
        function calculateEMI() {
            const principal = parseFloat(principalInput.value) || 0;
            const annualInterest = parseFloat(interestInput.value) || 0;
            const years = parseFloat(tenureInput.value) || 0;
            
            const monthlyRate = annualInterest / 12 / 100;
            const months = years * 12;
            
            if (principal <= 0 || annualInterest <= 0 || years <= 0 || months <= 0) {
                emiResult.textContent = 'R 0';
                totalInterest.textContent = 'R 0';
                totalPayment.textContent = 'R 0';
                return;
            }
            
            const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
            
            const totalPaymentAmount = emi * months;
            const totalInterestAmount = totalPaymentAmount - principal;
            
            emiResult.textContent = formatCurrency(Math.round(emi));
            totalInterest.textContent = formatCurrency(Math.round(totalInterestAmount));
            totalPayment.textContent = formatCurrency(Math.round(totalPaymentAmount));
        }
        
        window.addEventListener('DOMContentLoaded', initCalculator);
