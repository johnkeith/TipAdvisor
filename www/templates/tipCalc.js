<ion-view title='TipCalc'>
  <ion-content ng-controller='tipCalcCtrl'>
    <div class='calc-container'>
      <div class='bill-container'>
        <div class='header'>Bill</div>
        <div class='cur-bill'>
          {{ bill.dollars + "." + bill.cents | currency }}
        </div>
      </div>
      <div class='tip-container'>
        <div class='header'>Tip</div>
        <div class='cur-tip-per'>
          {{ tip + "%" }}
        </div>
        <div class='cur-tip'>
          {{ tipInCur | currency }}
        </div>
      </div>
      <div class='tip-slider-container'>
        <input class='tip-slider' max='35' min='0' ng-change='calcTotals()' ng-model='tip' step='1' type='range' value='15'>
      </div>
      <div class='total-container'>
        <div class='header'>Total</div>
        <div class='cur-total'>
          {{ billWithTip | currency }}
        </div>
      </div>
      <div class='num-btns-container'>
        <div class='row-btns'>
          <button class='num-btn' ng-click="btnInput('1')" type='button'>
            <div class='num-btn-text'>1</div>
          </button>
          <button class='num-btn' ng-click="btnInput('2')" type='button'>
            <div class='num-btn-text'>2</div>
          </button>
          <button class='num-btn' ng-click="btnInput('3')" type='button'>
            <div class='num-btn-text'>3</div>
          </button>
        </div>
        <div class='row-btns'>
          <button class='num-btn' ng-click="btnInput('4')" type='button'>
            <div class='num-btn-text'>4</div>
          </button>
          <button class='num-btn' ng-click="btnInput('5')" type='button'>
            <div class='num-btn-text'>5</div>
          </button>
          <button class='num-btn' ng-click="btnInput('6')" type='button'>
            <div class='num-btn-text'>6</div>
          </button>
        </div>
        <div class='row-btns'>
          <button class='num-btn' ng-click="btnInput('7')" type='button'>
            <div class='num-btn-text'>7</div>
          </button>
          <button class='num-btn' ng-click="btnInput('8')" type='button'>
            <div class='num-btn-text'>8</div>
          </button>
          <button class='num-btn' ng-click="btnInput('9')" type='button'>
            <div class='num-btn-text'>9</div>
          </button>
        </div>
        <div class='row-btns'>
          <button class='num-btn' ng-click="btnInput('0')" type='button'>
            <div class='num-btn-text'>0</div>
          </button>
          <button class='num-btn' ng-click="btnInput('.')" type='button'>
            <div class='num-btn-text'>.</div>
          </button>
          <button class='num-btn' ng-click="btnInput('C')" type='button'>
            <div class='num-btn-text'>C</div>
          </button>
        </div>
      </div>
    </div>
  </ion-content>
</ion-view>
