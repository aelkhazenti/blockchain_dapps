import smartpy as sp

tstorage = sp.record(candidateA_votes = sp.nat, candidateB_votes = sp.nat, total_votes = sp.nat, voters = sp.big_map(sp.address, sp.bool)).layout(("candidateA_votes", ("candidateB_votes", ("total_votes", "voters"))))
tparameter = sp.variant(reset_voting = sp.unit, vote_for_candidate_A = sp.unit, vote_for_candidate_B = sp.unit).layout(("reset_voting", ("vote_for_candidate_A", "vote_for_candidate_B")))
tprivates = { }
tviews = { }
